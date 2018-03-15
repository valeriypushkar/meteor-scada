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
import AppNavigation from './appnav'
import SideNavigation from './sidenav'
import TabNavigation from './tabnav'

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

  handleSideBarToggle = () => {
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  }

  renderNavRoute(item, parentPath) {
    const path = parentPath + '/' + item.name;

    if (!(item.children && item.children.length)) {
      return <Route key={path} path={path} exact component={item.component}/>;
    } else if (item.children[0].type === 'submenuitem') {
      return item.children.map(child => this.renderNavRoute(child, path));
    } else if (item.children[0].type === 'tabitem') {
      return <Route key={path} path={path} exact render={props => (
          <TabNavigation tabNavigation={item.children} />
        )} />;
    } else {
      return null;
    }
  }

  renderLayout() {
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
        <AppNavigation adminNavigation={adminNavigation} navigation={navigation}
          onToggle={this.handleSideBarToggle} />
        <SideNavigation adminNavigation={adminNavigation} navigation={navigation}
          mobileOpen={sideBarOpen} onClose={this.handleSideBarToggle} />
        <main className={classes.content}>

          <Switch>
            <Redirect from='/' exact to={home} />
            {adminNavigation.flatMap(item => this.renderNavRoute(item, ''))}
            {navigation.flatMap(item => this.renderNavRoute(item, ''))}
            <Route component={ NotFoundPage } />
          </Switch>
        </main>
      </div>
    );
  }
//<div className={classes.toolbar} />
  render() {
    // If navigation depends on data from server, the loading can take some time
    // We also need to wait when user info is loaded from server
    const { navigation, user } = this.props;
    return (navigation.length && user) ? this.renderLayout() : <LoadingPage />;
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
    display: 'flex',
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    paddingLeft: 0,
    [theme.breakpoints.up('md')]: { paddingLeft: 260 },
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: { paddingTop: 64 },
    backgroundColor: theme.palette.background.default,
  },
});


export default withStyles(styles)(withNavigation(
  withTracker({
    getMeteorData: () => ({ user: Meteor.user() }),
    pure: false
  })(MainLayout)
));
