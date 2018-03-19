import { Meteor } from 'meteor/meteor'
import AbstractData from './abstract'

/**
 * Defines a runtime data entity on the server.
 * @private
 */
export default class RuntimeData extends AbstractData {
  /**
   * Constructor
   * @param {string} name name of the data entity
   * @param {object} type object represents data type
   */
  constructor(name, type) {
    super(name);

  }
}
