import { Meteor } from 'meteor/meteor'

/**
 * Base class for simple data types.
 * @private
 */
export default class SimpleType {
  contructor() {
    this._writable = false;
  }

  rw() {
    this._writable = true;
    return this;
  }

  _isWritable() {
    return this._writable;
  }
}
