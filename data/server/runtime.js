import { Meteor } from 'meteor/meteor'

import RuntimeData from '../common/runtime'

/**
 * Defines a runtime data entity on the server.
 * @private
 */
class RuntimeDataServer extends RuntimeData {
  constructor(name, type) {
    super(name, type);
  }


}

// Save server implementation of RuntimeData so common code can use it
RuntimeData.impl = RuntimeDataServer;

//------------------------------------------------------------------------------
// All runtime data is cached on the server.
// Since runtime data is hardly used on the server it is better
// to have a single DB observer and cache all data in memory.
