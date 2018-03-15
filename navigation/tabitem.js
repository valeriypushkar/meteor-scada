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
   * Unique name of the tab item.
   */
  name: PropTypes.string.isRequired,

  /**
   * The title of the tab item.
   * This is what user sees on the screen.
   */
  title: PropTypes.string,

  /**
   * The component to render when this tab item is active.
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
