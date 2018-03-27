import MeteorScada from '../../core/common/namespace'
import BoolType from './types/bool'
import NumberType from './types/number'
import StringType from './types/string'
import ArrayType from './types/array'
import ObjectType from './types/object'
import ObjectData from './object'

/**
 * Namespace for Scada Data types.
 * @public
 */
export default class DataTypes {
  /** Define boolean type */
  static get bool() {return new BoolType();}

  /** Define number type */
  static get number() {return new NumberType();}

  /** Define string type */
  static get string() {return new StringType();}

  /** Define object type */
  static get object() {return new ObjectType();}

  /** Define array type */
  static get array() {return new ArrayType();}
}

/**
 * Provide data configuration.
 * @param {object} dataConf object represents data configuratino
 * @public
 */
export function configureData(dataConf) {
  if (typeof dataConf !== 'object') {
    throw new Meteor.Error('`dataConf` passed to configureData() ' +
      'method has to be an object');
  }

  if (MeteorScada._data) {
    throw new Meteor.Error('Data configuration has been set already.');
  }

  // Create root data object with empty name
  MeteorScada._data = new ObjectData('', dataConf);
}

/**
 * Returns root data object.
 * @public
 */
export function getData() {
  if (!MeteorScada._data) {
    throw new Meteor.Error('Data configuration has been provided.');
  }

  return MeteorScada._data;
}

MeteorScada._data = null;
MeteorScada.configureData = configureData;
MeteorScada.getData = getData;
