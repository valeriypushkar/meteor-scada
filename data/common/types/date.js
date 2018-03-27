import { Meteor } from 'meteor/meteor'
import SimpleType from './simple'

/**
 * Date type.
 * @public
 */
export default class DateType extends SimpleType {
  constructor() {
    super();
    this._default = null;
  }

  /**
   * Configure default value for the date type.
   * @param {Date} value - default value for the date type
   * @return type instance
   */
  default(value) {
    if (!this._validate(value)) {
      throw new Meteor.Error('Provided default date value is not valid');
    }

    this._default = value;
    return this;
  }

  /**
   * Get default value
   * @return {Date} the default value for this data type
   */
  _initialize() {
    return this._default;
  }

  /**
   * Validate.
   * @param {Date} value - value to validate
   * @return {boolean} true if value is valid
   */
  _validate(value) {
    return (value instanceof Date);
  }
}
