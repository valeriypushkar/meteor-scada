import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MeteorScada from '../core/common/namespace'
import NavTabItem from './tabitem'
import NavSubMenuItem from './submenuitem'

/**
 * Scada top-level menu item.
 * @public
 */
export default class NavMenuItem extends Component {
  componentWillMount = this._initialize;
  componentDidMount = this._publish;
  componentWillUpdate = this._initialize;
  componentDidUpdate = this._publish;

  _initialize(props) {
    props = props ? props : this.props;

    this.data = { children: [] };
    this.data.name = props.name;
    this.data.type = 'menuitem';
    this.data.icon = props.icon;
    this.data.title = props.title ? props.title : props.name;
    this.data.component = props.component;
  }

  _publish() {
    this.props.addItem && this.props.addItem(this.data);
  }

  _addItem = (item) => {
    this.data.children.push(item);
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

NavMenuItem.propTypes = {
  /**
   * Unique name of menu item.
   * This name will be a part of url. If this item defines teminate route
   * (doesn't have children) the url is <IP>/<name>.
   * Path to the children is <IP>/<name>/<child name>.
   */
  name: PropTypes.string.isRequired,

  /**
   * Material icon CSS name.
   * @see http://material.io/icons/
   */
  icon: PropTypes.string,

  /**
   * Title of menu item.
   * This is what user sees on the screen.
   */
  title: PropTypes.string,

  /**
   * Component to render when this menu item is active.
   * Can be specified only if item doesn't have child elements.
   */
  component: PropTypes.func,

  /**
   * `NavSubMenuItem` or `TabItem` elements.
   */
  children: function (props, propName, componentName) {
    let error = null;
    let childType = null;
    const childNames = new Set();

    React.Children.forEach(props[propName], function(child) {
      if (!child) {
        return;
      }

      if (child.type !== NavSubMenuItem && child.type !== NavTabItem) {
        error = new Error('`' + componentName + '` children should be '
          + 'of type `NavSubMenuItem` or `NavTabItem` only.');
      }

      if (childType && childType !== child.type) {
        error = new Error('`' + componentName + '` children should be '
          + 'either `NavSubMenuItem` or `NavTabItem` but not both.');
      }

      if (childNames.has(child.props.name)) {
        error = new Error('Child element `' + child.props.name + '` already '
          + 'exists. Use unique names for `NavMenuItem` child elements');
      }

      childType = child.type;
      childNames.add(child.props.name);
    });

    return error;
  }
};
