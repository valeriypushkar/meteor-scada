import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MeteorScada from '../core/common/namespace'

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
    
    this.data = { children: {} };
    this.data.type = "NavMenuItem";
    this.data.childType = null;
    this.data.icon = props.icon;
    this.data.title = props.title ? props.title : props.name;
    this.data.component = props.component;
    this.data.componentProps = props.componentProps;
  }

  _publish() {
    this.props.addItem && this.props.addItem(this.props.name, this.data);
  }

  render() {
    return null;
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
   * Props to be passed to component.
   */
  componentProps: PropTypes.object,

  /**
   * `NavSubMenuItem` or `TabItem` elements.
   */
  children: function (props, propName, componentName) {
    let error = null;
    return error;
  }
};
