import React, { Component } from 'react';
import PropTypes from 'prop-types'

import MeteorScada from '../common/namespace'
import NavMenuItem from './menuitem'
import { publishNavigation } from './store'

/**
 * Scada navigation provider.
 * @public
 */
export default class NavigationProvider extends Component {
  componentWillMount  = this.initialize
  componentDidMount   = this.publish
  componentWillUpdate = this.initialize
  componentDidUpdate  = this.publish

  initialize() {
    this.data = {};
  }

  publish() {
    publishNavigation(this.data);
  }

  addItem = (name, item) => {
    this.data[name] = item;
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { addItem: this.addItem }));

    return (
      <React.Fragment>
        {childrenWithProps ? childrenWithProps : null}
      </React.Fragment>
    );
  }
}

NavigationProvider.propTypes = {
  children: function (props, propName, componentName) {
    let error = null;
    const childNames = new Set();

    React.Children.forEach(props[propName], function(child) {
      if (child.type !== NavMenuItem) {
        error = new Error('`' + componentName + '` children should be '
          + 'of type `NavMenuItem` only.');
      }

      if (childNames.has(child.props.name)) {
        error = new Error('NavMenuItem `' + child.props.name + '` already '
          + 'exists. Use unique names for `NavigationProvider` child elements');
      }

      childNames.add(child.props.name);
    });

    return error;
  }
};
