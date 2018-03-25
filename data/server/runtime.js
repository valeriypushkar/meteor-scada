import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Roles } from 'meteor/alanning:roles'

import RuntimeData from '../common/runtime'
import { DataDependency } from './observer'
import { shallowEqual } from '../../utils/common/equal'

/**
 * Defines a runtime data entity on the server.
 * All runtime data on server is cached in memory.
 * Since runtime data is hardly used on the server it is more optimal
 * to have a single DB observer and cache all data in memory.
 * @private
 */
class RuntimeDataServer extends RuntimeData {
  constructor(name, type) {
    super(name, type);

    // undefined means we haven't read data from DB yet
    // null means read was done and value is null (no need of another read)
    this._value = undefined;
    this._depend = new DataDependency();

    RuntimeDataServer.map.set(name, this);
  }

  get() {
    this._depend.depend();
    return this.justGet();
  }

  justGet() {
    if (this._value === undefined) {
      // This value has not been read from DB yet. Do it now
      const doc = RuntimeData.collection.findOne({name: this._name});

      if (doc && doc.value !== undefined) {
        this._value = doc.value;
      } else {
        // We don't find anything so set value to default
        // Since it's not undefined anymore we will not do another search
        // The value will be updated automatically by DB observer
        this._value = this._type._initialize();
      }
    }

    return this._value;
  }

  set(value) {
    if (!this._type._validate(value)) {
      console.error('Value provided for ' + this._name + ' is not valid.');
      return;
    }

    if (shallowEqual(this._value, value)) {
      return;
    }

    RuntimeData.collection.update({ name: this._name },
      { $set: { value } }, { upsert: true });

    this._value = value;
    this._depend.changed();
  }

  _updateCache(doc) {
    if (!shallowEqual(this._value, doc.value)) {
      this._value = doc.value;
      this._depend.changed();
    }
  }
}

// Map runtime data name to the object
RuntimeDataServer.map = new Map();

// Save server implementation of RuntimeData so common code can use it
RuntimeData.impl = RuntimeDataServer;

//------------------------------------------------------------------------------

// Create index for run-time data collection
// Minimongo doesn't support indexes so this should be done on server-side only
// Creating indexes in MongoDB is an idempotent operation.
// So createIndex() would create the index only if it didn't already exist.
RuntimeData.collection.rawCollection().createIndex({"name": 1});

// Configure run-time data observer
function updateCacheItem(doc) {
  const rtdata = RuntimeDataServer.map.get(doc.name);
  if (rtdata) {
    rtdata._updateCache(doc);
  }
}

RuntimeData.collection.find({}).observe({
  added: updateCacheItem,
  changed: updateCacheItem
});

// Publish run-time data subscription to the client
Meteor.publish(RuntimeData.publication, (names) => {
  check(names, [String]);

  // Make sure the user is logged in before publishing
  if (!Roles.userIsInRole( Meteor.userId(), 'guest' )) {
    throw new Meteor.Error('User is not authorized');
  }

  return RuntimeData.collection.find( { name: {"$in": names} } );
});
