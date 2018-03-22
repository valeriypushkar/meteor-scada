import { Meteor } from 'meteor/meteor'

/**
 * Base class for simple data types.
 * @private
 */
export default class SimpleType {
  _initialize() {
    throw new Meteor.Error('Cannot call _initialize on abstract type');
  }

  _validate(value) {
    throw new Meteor.Error('Cannot call _validate on abstract type');
  }
}
