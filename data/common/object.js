import { Meteor } from 'meteor/meteor'
import AbstractData from './abstract'
import NumberType from './types/number'

if (Meteor.isClient) {
  const RuntimeData = require('../client/runtime').default;
} else if (Meteor.isServer) {
  const RuntimeData = require('../server/runtime').default;
}

/**
 * Defines an object to keep data entities.
 * @private
 */
export default class ObjectData extends AbstractData {
  /**
   * Constructor
   * @param {string} name name of the data entity
   * @param {object} config object represents data configuration.
   *  Each property of this object needs to be either other object or
   *  describes a type of the child data entity.
   */
  constructor(name, config) {
    super(name);


  }
}
