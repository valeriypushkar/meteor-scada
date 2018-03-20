import { Meteor } from 'meteor/meteor'

import MeteorScada from '../../core/common/namespace'
import AbstractData from '../common/abstract'

/**
 * Defines a runtime data entity on the server.
 * @private
 */
class RuntimeData extends AbstractData {
  /**
   * Constructor
   * @param {string} name name of the data entity
   * @param {object} type object represents data type
   */
  constructor(name, type) {
    super(name);

  }
}

// Save server implementation of RuntimeData in namespace
// so common code can use it
MeteorScada.impl.RuntimeData = RuntimeData;
