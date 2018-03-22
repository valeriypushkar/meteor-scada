import { Meteor } from 'meteor/meteor'
import SimpleType from './simple'

/**
 * String data type.
 * @public
 */
export default class StringType extends SimpleType {
  constructor() {
    super();
    this._default = null;
  }

  /**
   * Configure default value for the string type.
   * @param {string} value - default value for the string type
   * @return string type instance
   */
  default(value) {
    if (!this._validate(value)) {
      throw new Meteor.Error('Provided default string value is not valid');
    }

    this._default = value;
    return this;
  }

  /**
   * Get default value
   * @return {string} the default value for this data type
   */
  _initialize() {
    return this._default;
  }

  /**
   * Validate.
   * @param {string} value - value to validate
   * @return {boolean} true if value is valid
   */
  _validate(value) {
    return (typeof value === 'string' || value instanceof String);
  }
}
