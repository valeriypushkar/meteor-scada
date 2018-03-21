import { Meteor } from 'meteor/meteor'

import RuntimeData from '../common/runtime'

/**
 * Defines a runtime data entity on the client.
 * @private
 */
class RuntimeDataClient extends RuntimeData {
  constructor(name, type) {
    super(name, type);

  }
}


// Save client implementation of RuntimeData so common code can use it
RuntimeData.impl = RuntimeDataClient;
