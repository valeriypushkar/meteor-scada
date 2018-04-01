import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

import AbstractData from './abstract'

/**
 * Defines a runtime data entity.
 * <p> All run-time data is persisted in a single MongoDB collection.
 * Each data entry has an unique identifier (name) that is DB index.
 * Persisting all run-time data in a single collection is more effective from
 * capacity (less overhead) and performance (getting multiple records by
 * a sigle request) perspectives.
 * @public
 */
export default class RuntimeData extends AbstractData {
  /**
   * Constructor
   * @param {string} name name of the data entity
   * @param {object} type object represents data type
   */
  constructor(name, type) {
    super(name);
    this._type = type;
  }

  /**
   * Get run-time data value.
   * This is reactive version of function. Being run inside
   * MeteorScada.observeData() on server or MeteorScada.withData()
   * on client forces method to re-run if data is changed.
   */
  get() {
    throw new Meteor.Error("Server or Client implementation needs to be used");
  }

  /**
   * Get run-time data value (non-reactive version).
   * Use if you don't need to depend on this value.
   * Available only on server-side.
   */
  justGet() {
    throw new Meteor.Error("Server or Client implementation needs to be used");
  }

  /**
   * Set run-time data value.
   */
  set(value) {
    throw new Meteor.Error("Server or Client implementation needs to be used");
  }
}

// Create MongoDB collection and index for run-time data
// Index needs to be created only on server. See server implementation
RuntimeData.collection = new Mongo.Collection('data.runtime');

// Publication name of run-time data
RuntimeData.publication = 'data.runtime';
