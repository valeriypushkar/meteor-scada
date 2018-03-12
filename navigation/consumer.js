import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MeteorScada from '../core/common/namespace'
import { subscribeNavigation, unsubscribeNavigation } from './store'

/**
 * Scada navigation consumer.
 * @private
 */
class NavigationConsumer extends Component {
  state = {
    navigation: {}
  }

  componentWillMount() {
    this.subscription = subscribeNavigation(this.onNavigationChange);
  }

  componentWillUnmount() {
    unsubscribeNavigation(this.subscription);
  }

  onNavigationChange = (navigation) => {
    this.setState({navigation: navigation});
  }
};

/**
 * Wrapper method for React components to have access to Scada navigation
 * configuration. Propogates navigation configuratin changes to wrapped
 * component as `navigation` prop.
 * @public
 */
export default function withNavigation(WrappedComponent) {
  return (
    class NavigationConsumerImpl extends NavigationConsumer {
      render() {
        return <WrappedComponent {...this.props} {...this.state} />;
      }
    }
  );
}
