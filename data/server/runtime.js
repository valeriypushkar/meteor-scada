import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Roles } from 'meteor/alanning:roles'

import RuntimeData from '../common/runtime'
import { DataDependency } from './observer'

/**
 * Defines a runtime data entity on the server.
 * @private
 */
class RuntimeDataServer extends RuntimeData {
  constructor(name, type) {
    super(name, type);
    addCacheItem(name);
  }

  get() {
    return getCachedValue(this.name, true);
  }

  justGet() {
    return getCachedValue(this.name);
  }

  set(value) {
    RuntimeData.collection.update({ name: this.name },
      { $set: {value: value} }, {upsert: true});

    // Do not send notify. It will be done by DB observer
    updateCacheItem({name: this.name, value: value});
  }
}

// Save server implementation of RuntimeData so common code can use it
RuntimeData.impl = RuntimeDataServer;

//------------------------------------------------------------------------------
// All runtime data is cached on the server.
// Since runtime data is hardly used on the server it is better
// to have a single DB observer and cache all data in memory.

const runtimeCache = new Map();

function addCacheItem(name) {
  if (runtimeCache.has(name)) {
    throw new Meteor.Error("RuntimeData with given name already exists");
  }

  runtimeCache.set(name, {
    // undefined means we haven't read data from DB yet
    // null means read was done and value is null (no need of another read)
    value: undefined,
    depend: new DataDependency
  });
}

function getCachedValue(name, notify) {
  const item = runtimeCache.get(name);
  if (!item) {
    throw new Meteor.Error("RuntimeData with given name doesn't exist");
  }

  if (notify) {
    item.depend.depend();
  }

  if (item.value === undefined) {
    // This value has not been read from DB yet. Do it now
    const doc = RuntimeData.collection.findOne({name: name});

    if (doc && doc.value !== undefined) {
      item.value = doc.value;
    } else {
      // We don't find anything so set value to null
      // Since it's not undefined anymore we will not do another search
      // The value will be updated automatically by DB observer
      // TODO: implement default value
      item.value = null;
    }
  }

  return item.value;
}

function updateCacheItem(doc, notify) {
  const item = runtimeCache.get(doc.name);
  if (!item) return;

  // We don't check that value has beed changed. We trust DB observer.
  // FIXME: this needs to be changed. this method used not only by DB observer
  item.value = doc.value;

  if (notify) {
    // Notify data obeserver that this value has been changed
    item.depend.changed();
  }
}

//------------------------------------------------------------------------------

// Create index for run-time data collection
// Minimongo doesn't support indexes so this should be done on server-side only
// Creating indexes in MongoDB is an idempotent operation.
// So createIndex() would create the index only if it didn't already exist.
RuntimeData.collection.rawCollection().createIndex({"name": 1});

// Configure run-time data observer
RuntimeData.collection.find({}).observe({
  added: (doc) => updateCacheItem(doc, true),
  changed: (newDoc, oldDoc) => updateCacheItem(newDoc, true)
});

// Publish run-time data subscription to the client
Meteor.publish(RuntimeData.publication, (names) => {
  check(names, [String]);

  // Make sure the user is logged in before publishing
  if (!Roles.userIsInRole( Meteor.userId(), 'guest' )) {
    console.warn("User is not authorized");
    throw new Meteor.Error('User is not authorized');
  }

  return RuntimeData.collection.find( { name: {"$in": names} } );
});
