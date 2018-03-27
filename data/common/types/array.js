import { Meteor } from 'meteor/meteor'
import SimpleType from './simple'

/**
 * Array data type.
 * @public
 */
export default class ArrayType extends SimpleType {
  constructor() {
    super();
    this._default = null;
    this._type = null;
  }

  /**
   * Configure type of array elements.
   */
  of(type) {
    if(!(type instanceof SimpleType)) {
      throw new Meteor.Error('Provided array element type is not valid');
    }

    this._type = type;
    return this;
  }

  /**
   * Configure default value for the type.
   * @param {array} value - default value for the type
   * @return array type instance
   */
  default(value) {
    if (!this._validate(value)) {
      throw new Meteor.Error('Provided default array value is not valid');
    }

    this._default = value;
    return this;
  }

  /**
   * Get default value
   * @return {array} the default value for this data type
   */
  _initialize() {
    return this._default;
  }

  /**
   * Validate.
   * @param {array} value - value to validate
   * @return {boolean} true if value is valid
   */
  _validate(value) {
    let valid = Array.isArray(value);

    if (valid && this._type) {
      valid = value.every(this._type._validate.bind(this._type));
    }

    return valid;
  }
}
