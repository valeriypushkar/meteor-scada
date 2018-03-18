import NumberType from './number'

/**
 * Namespace for Scada Data types.
 * @public
 */
export default class DataTypes {
  /** Define number type */
  static get number() {return new NumberType();}


}
