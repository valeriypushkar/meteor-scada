import { Meteor } from 'meteor/meteor'
import SimpleType from './simple'

/**
 * Boolean data type.
 * @public
 */
export default class BoolType extends SimpleType {
  constructor() {
    super();
    this._default = null;
  }

  /**
   * Configure default value for the boolean type.
   * @param {boolean} value - default value for the boolean type
   * @return boolean type instance
   */
  default(value) {
    if (!this._validate(value)) {
      throw new Meteor.Error('Provided default boolean value is not valid');
    }

    this._default = value;
    return this;
  }

  /**
   * Get default value
   * @return {boolean} the default value for this data type
   */
  _initialize() {
    return this._default;
  }

  /**
   * Validate.
   * @param {boolean} value - value to validate
   * @return {boolean} true if value is valid
   */
  _validate(value) {
    return (typeof value === 'boolean');
  }
}
