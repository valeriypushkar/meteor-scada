import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MeteorScada from '../core/common/namespace'

/**
 * Scada top menu item.
 * @public
 */
export default class NavMenuItem extends Component {
  componentWillMount = this._initialize
  componentDidMount = this._publish
  componentWillUpdate = this._initialize
  componentDidUpdate = this._publish

  _initialize() {
    this.data = { children: {} };
    this.data.type = "NavMenuItem";
    this.data.childType = null;
    this.data.icon = this.props.icon;
    this.data.title = this.props.title ? this.props.title : this.props.name;
    this.data.component = this.props.component;
    this.data.componentProps = this.props.componentProps;
  }

  _publish() {
    this.props.addItem && this.props.addItem(this.props.name, this.data);
  }

  render() {
    return null;
  }
}

NavMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
  component: PropTypes.func,
  componentProps: PropTypes.object,
  children: function (props, propName, componentName) {
    let error = null;
    return error;
  }
};
