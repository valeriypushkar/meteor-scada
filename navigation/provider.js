import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MeteorScada from '../core/common/namespace'
import NavMenuItem from './menuitem'
import { publishNavigation } from './store'

/**
 * Scada navigation provider.
 * @public
 */
export default class NavigationProvider extends Component {
  componentWillMount() {this._initialize();}
  componentDidMount() {this._publish();}
  componentWillUpdate(nextProps, nextState) {this._initialize();}
  componentDidUpdate(prevProps, prevState) {this._publish();}

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
