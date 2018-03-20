import { Meteor } from 'meteor/meteor'

/**
 * Defines base class for data entity.
 * All types of data entities have to extend this class.
 * @private
 */
export default class AbstractData {
  /**
   * Constructor
   * @param {string} name name of the data entity
   */
  constructor(name) {
    this._name = name;
  }

  /**
   * Unique name of data entity.
   */
  get name() {
    return this._name;
  }
}
