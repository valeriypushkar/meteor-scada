import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import React from 'react'

import MeteorScada from '../../core/common/namespace'
import LoadingPage from '../../utils/client/loading'
import RuntimeData from '../common/runtime'
import './runtime'

/**
 * Data observer.
 */
export class DataObserver extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataReady: false,
    }

    this._computation = null;
  }

  componentWillMount() {
    this._runComputation(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._runComputation(nextProps);
  }

  componentWillUnmount() {
    if (this._computation) {
      this._computation.stop();
      this._computation = null;
    }
  }

  _runComputation(props) {
    // Stop current computation to run the new one
    // This automatically deactivates all subscriptions
    // but doesn't deletes them immediately so they can be reused
    this._computation && this._computation.stop();

    this._computation = Tracker.autorun((c) => {
      // Set subscriptions readyness to true.
      // Data variables will set it to false if they are not ready.
      Tracker.currentComputation._data_ready = true;

      // Set runtime data request to the empty set.
      // Each RuntimeData will add its name to the set so we can
      // subscribe to all of them at once. If subscription is not changed,
      // Meteor will re-use existing one and it will be ready immediately.
      Tracker.currentComputation._runtime_list = new Set();

      // Create new object on each update so React will update the component
      const newData = this._getData(props);

      const rtList = Array.from(Tracker.currentComputation._runtime_list);
      let dataReady = Tracker.currentComputation._data_ready;

      // Collect RuntimeData names and create subscription
      // If it's ready, it means RuntimeData getters have read all data
      if (rtList.length > 0) {
        // Subscription will be stopped automatically when Tracker is stopped
        const rtSub = Meteor.subscribe(RuntimeData.pubname, rtList);
        dataReady = dataReady && rtSub.ready();
      }

      // Check current state and modify it if required
      if (dataReady) {
        this.setState({ dataReady, ...newData });
      } else if (this.state.ready) {
        this.setState({ dataReady });
      }
    });
  }

  _getData(props) {
    throw new Meteor.Error("_getData() method must be implemented");
  }
}

/**
 * Observe data changes on client.
 * @param {function} dataFunc function returns props for the wrapped component
 * @param {React.Component} WrappedComponent component to be wrapped
 */
export function withData(dataFunc, WrappedComponent) {
  return (
    class DataObserverImpl extends DataObserver {
      _getData(props) {
        return dataFunc(props);
      }

      render() {
        return <WrappedComponent {...this.props} {...this.state} />;
      }
    }
  );
}

/**
 * Observe data changes on client.
 * If data is not ready renders null.
 * @param {function} dataFunc function returns props for the wrapped component
 * @param {React.Component} WrappedComponent component to be wrapped
 */
export function withDataOnly(dataFunc, WrappedComponent) {
  return (
    class DataObserverImpl extends DataObserver {
      _getData(props) {
        return dataFunc(props);
      }

      render() {
        return this.state.dataReady ?
          <WrappedComponent {...this.props} {...this.state} /> : null;
      }
    }
  );
}

/**
 * Observe data changes on client.
 * If data is not ready shows progress indicator.
 * @param {function} dataFunc function returns props for the wrapped component
 * @param {React.Component} WrappedComponent component to be wrapped
 */
export function withDataLoader(dataFunc, WrappedComponent) {
  return (
    class DataObserverImpl extends DataObserver {
      _getData(props) {
        return dataFunc(props);
      }

      render() {
        return this.state.dataReady ?
          <WrappedComponent {...this.props} {...this.state} /> :
            <LoadingPage />;
      }
    }
  );
}

MeteorScada.withData = withData;
MeteorScada.withDataOnly = withDataOnly;
MeteorScada.withDataLoader = withDataLoader;
