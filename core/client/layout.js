import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import { withTracker } from 'meteor/react-meteor-data'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import MeteorScada from '../common/namespace'
import withNavigation from '../../navigation/consumer'
import NavigationBar from './navbar'
import SideBar from './sidebar'
import LoadingPage from './loading'
import NotFoundPage from './notfound'
import UserPage from './users'
import DevicePage from './devices'

/**
 * Main layout of the SCADA application.
 * @private
 */
class MainLayout extends Component {
  state = {
    sideBarOpen: false
  };

  _handleSideBarToggle = () => {
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  }

  _renderNavRoute(item, path) {
    path = (path || '') + '/' + item.name;

    if (!(item.children && item.children.length)) {
      return <Route key={path} path={path} exact component={item.component}/>;
    } else if (item.children[0].type === 'submenuitem') {
      return item.children.map(child => this._renderNavRoute(child, path));
    } else if (item.children[0].type === 'tabitem') {
      return null; // TODO: implement tab item
    } else {
      return null;
    }
  }

  _renderLayout() {
    const { classes, navigation, user } = this.props;
    const { sideBarOpen } = this.state;

    // Redirect home to the first user defined page
    var home = '/' + navigation[0].name;
    if (navigation[0].children && navigation[0].children.length) {
      home += '/' + navigation[0].children[0].name;
    }

    // Add adminMenu only if user is in admin role
    const adminNavigation =
      Roles.userIsInRole( user, 'admin' ) ? [adminMenu] : [];

    return(
      <div className={classes.root}>
        <NavigationBar onToggle={this.handleSideBarToggle}/>
        <SideBar navigation={navigation} adminNavigation={adminNavigation}
          mobileOpen={sideBarOpen} onClose={this.handleSideBarToggle}/>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Redirect from='/' exact to={home} />
            {adminNavigation.flatMap(item => this._renderNavRoute(item))}
            {navigation.flatMap(item => this._renderNavRoute(item))}
            <Route component={ NotFoundPage } />
          </Switch>
        </main>
      </div>
    );
  }

  render() {
    // If navigation depends on data from server, the loading can take some time
    // We also need to wait when user info is loaded from server
    const { navigation, user } = this.props;
    return (navigation.length && user) ? this._renderLayout() : <LoadingPage />;
  }
}

const adminMenu = {
  name: 'admin',
  type: 'menuitem',
  icon: 'settings',
  title: 'Administrator',
  children: [
    {
      name: 'users',
      type: 'submenuitem',
      title: 'Users',
      component: UserPage
    },
    {
      name: 'devices',
      type: 'submenuitem',
      title: 'Devices',
      component: DevicePage
    }
  ]
};

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  navigation: PropTypes.array.isRequired,
  user: PropTypes.object,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(withNavigation(
  withTracker(() => ({ user: Meteor.user() }))(MainLayout)
));
