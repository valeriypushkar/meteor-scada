import React, { Component } from 'react';

import NavigationBar from './navbar'
import SideBar from './sidebar'

/**
 * Main layout of the SCADA application.
 * @private
 */
class MainLayout extends Component {
  render() {
    return(
      <div>
        <NavigationBar />
        <SideBar />
      </div>
    );
  }
}

export default MainLayout;
