import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import MeteorScada from '../core/common/namespace'
import { subscribeNavigation, unsubscribeNavigation } from './store'

/**
 * Scada navigation consumer.
 * Propogates navigation configuratin changes to child elements as
 * `navigation` prop.
 * @public
 */
export default class NavigationConsumer extends PureComponent {
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

  render() {
    if (!this.props.children) {
      return null;
    }

    return (
      <React.Fragment>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, { navigation: this.state.navigation }))}
      </React.Fragment>
    );
  }
};
