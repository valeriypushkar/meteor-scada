import { Meteor } from 'meteor/meteor'
import SimpleType from './simple'

/**
 * Object data type.
 * @public
 */
export default class ObjectType extends SimpleType {
  constructor() {
    super();
    this._default = null;
    this._shape = null;
  }

  /**
   * Configure types of object properties.
   */
  shape(shape) {
    if(shape === null || typeof shape !== 'object' || Array.isArray(shape)) {
      throw new Meteor.Error('Provided object shape is not valid');
    }

    for (var key in shape) {
      if (shape.hasOwnProperty(key) && !(shape[key] instanceof SimpleType)) {
        throw new Meteor.Error('Provided object property type is not valid');
      }
    }

    this._shape = shape;
    return this;
  }

  /**
   * Configure default value for the type.
   * @param {object} value - default value for the type
   * @return object type instance
   */
  default(value) {
    if (!this._validate(value)) {
      throw new Meteor.Error('Provided default object value is not valid');
    }

    this._default = value;
    return this;
  }

  /**
   * Get default value
   * @return {object} the default value for this data type
   */
  _initialize() {
    return this._default;
  }

  /**
   * Validate.
   * @param {object} value - value to validate
   * @return {boolean} true if value is valid
   */
  _validate(value) {
    let valid = !!value && typeof value === 'object' && !Array.isArray(value);

    if (valid && this._shape) {
      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          valid = valid && !!this._shape[key] &&
            this._shape[key]._validate(value[key]);
        }
      }
    }

    return valid;
  }
}
