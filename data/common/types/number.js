import { Meteor } from 'meteor/meteor'
import SimpleType from './simple'

/**
 * Number data type.
 * @public
 */
export default class NumberType extends SimpleType {
  constructor() {
    super();
    this._min = null;
    this._max = null;
    this._default = null;
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
    if (!this._validate(value)) {
      throw new Meteor.Error('Provided default number value is not valid');
    }

    this._default = value;
    return this;
  }

  /**
   * Get default value
   * @return {number} the default value for this data type
   */
  _initialize() {
    return this._default;
  }

  /**
   * Validate.
   * @param {number} value - value to validate
   * @return {boolean} true if value is valid
   */
  _validate(value) {
    return (typeof value === 'number') &&
      (this._min == null || value >= this._min) &&
      (this._max == null || value <= this._max);
  }


}
