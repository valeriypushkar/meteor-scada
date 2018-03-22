import { Meteor } from 'meteor/meteor'

import MeteorScada from '../../core/common/namespace'
import AbstractData from './abstract'
import RuntimeData from './runtime'
import BoolType from './types/bool'
import NumberType from './types/number'
import StringType from './types/string'

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
   *  describes a type of the data entity.
   */
  constructor(name, config) {
    super(name);

    for (var key in config) {
      if (!config.hasOwnProperty(key) || !config[key]) {
        continue;
      }

      const value = config[key];
      const childName = name ? (name + '.' + key) : key;

      if ((value instanceof BoolType) || (value instanceof NumberType) ||
        (value instanceof StringType)) {
        this[key] = new RuntimeData.impl(childName, value);
      } else if (typeof value === "object" && !Array.isArray(value)) {
        this[key] = new ObjectData(childName, value);
      }
    }
  }
}
