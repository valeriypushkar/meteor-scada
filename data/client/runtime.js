import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import RuntimeData from '../common/runtime'

/**
 * Defines a runtime data entity on the client.
 * @private
 */
class RuntimeDataClient extends RuntimeData {
  constructor(name, type) {
    super(name, type);
  }

  get() {
    if (!Tracker.active || !Tracker.currentComputation._runtime_list) {
      throw new Meteor.Error(
        'Getting value of RuntimeData on the client needs to be done ' +
        'by DataObserver object. Consider using MeteorScada.withData() ' +
        'method to wrap your React component');
    }

    // Add this run-time data to the list
    // DataObserver will subscribe to all run-time data in a single subscription
    Tracker.currentComputation._runtime_list.add(this._name);

    // Try to find data in collection. If subscription is ready we will get it.
    // If there is no data in collection => default value
    const doc = RuntimeData.collection.findOne({name: this._name});
    return doc ? doc.value : this._type._initialize();
  }

  justGet() {
    throw new Meteor.Error("This method cannot be used on client");
  }

  set(value) {
    if (!this._type._validate(value)) {
      console.error('Value provided for ' + this._name + ' is not valid.');
      return;
    }

    Meteor.call('runtime.set', this._name, value);
  }
}

// Save client implementation of RuntimeData so common code can use it
RuntimeData.impl = RuntimeDataClient;

// Define method for setting runtime data
Meteor.methods({
  'runtime.set'(name, value) {
    RuntimeData.collection.update({ name },
      { $set: { value } }, { upsert: true }
    );
  }
});
