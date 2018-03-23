import { Meteor } from 'meteor/meteor'
import Fiber from 'fibers'

import MeteorScada from '../../core/common/namespace'
import RuntimeDataServer from './runtime'

// Id generator for DataObservers
var nextId = 1;

/**
 * Data dependency
 * @private
 */
export class DataDependency {
  constructor() {
    this._observers = new Map();
  }

  depend() {
    if (!Fiber.current || !Fiber.current._data_observer ||
        this._observers.get(Fiber.current._data_observer._id)) {
      // We are not in Fiber or Fiber is not DataObserver.
      // Or this observer has beed registered already
      return;
    }

    const observer = Fiber.current._data_observer;
    this._observers.set(observer._id, observer);
    observer._onStop((o) => this._observers.delete(o._id));
  }

  changed() {
    this._observers.forEach((observer) => observer.wakeup());
  }
}

/**
 * Data observer.
 * @private
 */
export class DataObserver {
  constructor(func) {
    if (typeof func !== 'function') {
      throw new Meteor.Error('Parameter is not a function');
    }

    this._id = nextId++;
    this._func = func;
    this._onStopCallbacks = [];

    this._stopped = false;
    this._yielding = false;
    this._wakeup = false;

    // Run data observer
    this._fiber = Fiber(this._observe.bind(this));
    this._fiber._data_observer = this;
    this._fiber.run();
  }

  wakeup() {
    this._yielding ? this._fiber.run() : this._wakeup = true;
  }

  stop() {
    if (!this._stopped) {
      this._stopped = true;
      this.wakeup();
    }
  }

  _observe() {
    while(!this._stopped) {
      this._func();
      this._yield();
    }

    this._terminate();
  }

  _onStop(callback) {
    if (this._stopped) {
      callback(this);
    } else {
      this._onStopCallbacks.push(callback);
    }
  }

  _yield() {
    if (!this._wakeup) {
      this._yielding = true;
      Fiber.yield();
      this._yielding = false;
    }

    this._wakeup = false;
  }

  _terminate() {
    this._onStopCallbacks.forEach(c => c(this));
    this._onStopCallbacks = [];

    delete this._fiber._data_observer;
    delete this._fiber;
    delete this._func;
  }
}

/**
 * Observe data changes on server.
 * Runs function that is provided a parameter and remembers which data is used.
 * When some of data is changed re-runs the function.
 * @param {function} func function that uses data
 * @return observer object
 */
export default function observeData(func) {
  return new DataObserver(func);
}

MeteorScada.observeData = observeData;
