import MeteorScada from '../../core/common/namespace'
import NumberType from './types/number'
import ObjectData from './object'

/**
 * Namespace for Scada Data types.
 * @public
 */
export default class DataTypes {
  /** Defince boolean type */
  static get bool() {return null;} // TODO: implement boolean

  /** Define number type */
  static get number() {return new NumberType();}

  /** Defince string type */
  static get string() {return null;} // TODO: implement string

  /** Defince object` type */
  static get object() {return null;} // TODO: implement object

  /** Defince array type */
  static get array() {return null;} // TODO: implement array
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
