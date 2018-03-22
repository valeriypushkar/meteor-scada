import { Meteor } from 'meteor/meteor'

/**
 * Boolean data type.
 * @public
 */
export default class BoolType {
  constructor() {
    this._default = false;
  }

  /**
   * Configure default value for the boolean type.
   * @param {boolean} value - default value for the boolean type
   * @return boolean type instance
   */
  default(value) {
    if (typeof value !== 'boolean') {
      throw new Meteor.Error('Default value of BoolType should be a boolean');
    }

    this._default = value;
    return this;
  }

  /**
   * Validate.
   * @param {boolean} value - value to validate
   * @return {boolean} true if value is valid
   */
  isValid(value) {
    return (typeof value === 'boolean');
  }

  /**
   * Get default value
   * @return {boolean} the default value for this data type
   */
  getDefault() {
    return this._default;
  }
}
