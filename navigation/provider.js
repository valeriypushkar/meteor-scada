import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MeteorScada from '../core/common/namespace'
import NavMenuItem from './menuitem'
import { publishNavigation } from './store'

/**
 * Scada navigation provider.
 * Use this component to define Scada navigation (menu) configuration.
 * @public
 */
export default class NavigationProvider extends Component {
  componentWillMount = this._initialize;
  componentDidMount = this._publish;
  componentWillUpdate = this._initialize;
  componentDidUpdate = this._publish;

  _initialize() {
    this.data = {};
  }

  _publish() {
    publishNavigation(this.data);
  }

  _addItem = (name, item) => {
    this.data[name] = item;
  }

  render() {
    if (!this.props.children) {
      return null;
    }

    return (
      <React.Fragment>
        {React.Children.map(this.props.children, child =>
          child && React.cloneElement(child, { addItem: this._addItem }))}
      </React.Fragment>
    );
  }
}

NavigationProvider.propTypes = {
  /**
   * `NavMenuItem` elements.
   * @see NavMenuItem
   */
  children: function (props, propName, componentName) {
    let error = null;
    const childNames = new Set();

    React.Children.forEach(props[propName], function(child) {
      if (!child) {
        return;
      }

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

/**
 * Provide navigation configuration.
 * Scada application needs to provide React component that renders
 * `NavigationProvider` with child elements to configure navigation and menu.
 * @param {React.Component} provider component provides navigation configuration
 * @see NavigationProvider
 * @public
 */
export function configureNavigation(provider) {
  if (typeof provider !== 'function') {
    throw new Meteor.Error('`provider` passed to configureNavigation() ' +
      'method is not valid React.Component');
  }

  if (MeteorScada._navigationProvider) {
    throw new Meteor.Error('Navigation provider has been set already.');
  }

  MeteorScada._navigationProvider = React.createElement(provider);
}

MeteorScada._navigationProvider = null;
MeteorScada.configureNavigation = configureNavigation;
