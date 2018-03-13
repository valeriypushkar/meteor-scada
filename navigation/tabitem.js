import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MeteorScada from '../core/common/namespace'

/**
 * Scada tab navigation item.
 * @public
 */
export default class NavTabItem extends Component {
  componentWillMount = this._initialize;
  componentDidMount = this._publish;
  componentWillUpdate = this._initialize;
  componentDidUpdate = this._publish;

  _initialize(props) {
    props = props ? props : this.props;

    this.data = {};
    this.data.name = props.name;
    this.data.type = 'tabitem';
    this.data.title = props.title ? props.title : props.name;
    this.data.component = props.component;
  }

  _publish() {
    this.props.addItem && this.props.addItem(this.data);
  }

  render() {
    return null;
  }
}

NavTabItem.propTypes = {
  /**
   * Unique name of tab item.
   */
  name: PropTypes.string.isRequired,

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
   * Cannot have child elements.
   */
  children: function (props, propName, componentName) {
    return React.Children.count(props[propName]) ?
      new Error('`' + componentName + '` cannot have child elements.') : null;
  }
};
