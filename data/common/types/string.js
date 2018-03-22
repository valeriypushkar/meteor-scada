import { Meteor } from 'meteor/meteor'

/**
 * String data type.
 * @public
 */
export default class StringType {
  constructor() {
    this._default = "";
  }

  /**
   * Configure default value for the string type.
   * @param {string} value - default value for the string type
   * @return string type instance
   */
  default(value) {
    if (typeof value !== 'string') {
      throw new Meteor.Error('Default value of StringType should be a string');
    }

    this._default = value;
    return this;
  }

  /**
   * Validate.
   * @param {string} value - value to validate
   * @return {boolean} true if value is valid
   */
  isValid(value) {
    return (typeof value === 'string');
  }

  /**
   * Get default value
   * @return {string} the default value for this data type
   */
  getDefault() {
    return this._default;
  }
}
