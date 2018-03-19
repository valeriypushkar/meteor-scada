import { Meteor } from 'meteor/meteor'

/**
 * Number data type.
 * @public
 */
export default class NumberType {
  constructor() {
    // No min/max values by default
    this._min = null;
    this._max = null;
    this._default = 0;
  }

  /**
   * Configure minimum for the number.
   * @param {number} value - minimum value for the number
   * @return number type instance
   */
  min(value) {
    if (typeof value !== 'number') {
      throw new Meteor.Error('Minimum value of NumberType should be a number');
    }

    this._min = value;
    return this;
  }

  /**
   * Configure maximum for the number.
   * @param {number} value - maximum value for the number
   * @return number type instance
   */
  max(value) {
    if (typeof value !== 'number') {
      throw new Meteor.Error('Maximum value of NumberType should be a number');
    }

    this._max = value;
    return this;
  }

  /**
   * Configure default value for the number.
   * @param {number} value - default value for the number
   * @return number type instance
   */
  default(value) {
    if (typeof value !== 'number') {
      throw new Meteor.Error('Default value of NumberType should be a number');
    }

    this._default = value;
    return this;
  }

  /**
   * Validate.
   * @param {number} value - value to validate
   * @return {boolean} true if value is valid
   */
  isValid(value) {
    return (typeof value === 'number') &&
      (value >= this._min) && (value <= this._max);
  }

  /**
   * Get default value
   * @return {number} the default value for this data type
   */
  getDefault() {
    return this._default;
  }
}
