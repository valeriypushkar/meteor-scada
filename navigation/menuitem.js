import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MeteorScada from '../core/common/namespace'

/**
 * Scada top menu item.
 * @public
 */
export default class NavMenuItem extends Component {
  componentWillMount() {this._initialize(this.props);}
  componentDidMount() {this._publish();}
  componentWillUpdate(nextProps, nextState) {this._initialize(nextProps);}
  componentDidUpdate(prevProps, prevState) {this._publish();}

  _initialize(props) {
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
