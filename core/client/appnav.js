import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import Typography from 'material-ui/Typography'
import Menu, { MenuItem } from 'material-ui/Menu'
import { ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { withStyles } from 'material-ui/styles'

import { IMG_LOGO } from '../../resources/catalog'

/**
 * SCADA application navigation bar.
 * @private
 */
class AppNavigation extends Component {
  state = {
    accountMenuAnchor: null,
  }

  handleAccountMenu = event => {
    this.setState({ accountMenuAnchor: event.currentTarget });
  };

  handleCloseAccountMenu = () => {
    this.setState({ accountMenuAnchor: null });
  };

  handleLogout = () => {
    Meteor.logout(() => this.props.history.push('/login'));
  }

  renderTitle(title, className) {
    return (
      <Typography className={className} variant="title" color="inherit">
        {title}
      </Typography>
    );
  }

  renderSingleTitle(item) {
    const { classes } = this.props;

    return (
      <div className={classes.title}>
        {this.renderTitle(item.title, classes.titleMain)}
      </div>
    );
  }

  renderDoubleTitle(item) {
    const { classes } = this.props;

    return (
      <div className={classes.title}>
        {this.renderTitle(item.title, classes.titleSecondary)}
        <Icon className={classes.titleSeparator}>navigate_next</Icon>
        {item.children.map(child =>
          <Route key={child.name} path={'/' + item.name + '/' + child.name}
            render={() => this.renderTitle(child.title, classes.titleMain)} />
        )}
      </div>
    );
  }

  renderTitleRoute(item) {
    const hasChild = item.children && item.children.length !== 0 &&
      item.children[0].type === 'submenuitem';

    return (
      <Route key={item.name} path={'/' + item.name} render={() =>
        hasChild ? this.renderDoubleTitle(item) : this.renderSingleTitle(item)
      } />
    );
  }

  renderAccountMenu() {
    const isOpen = Boolean(this.state.accountMenuAnchor);

    return (
      <Menu
        id="menu-appbar" anchorEl={this.state.accountMenuAnchor}
        anchorOrigin={{vertical: 'top', horizontal: 'right' }}
        transformOrigin={{vertical: 'top', horizontal: 'right' }}
        open={isOpen}
        onClose={this.handleCloseAccountMenu}
      >
        <MenuItem onClick={this.handleCloseAccountMenu}>
          <ListItemIcon><Icon>person_outline</Icon></ListItemIcon>
          <ListItemText inset primary="Profile settings" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={this.handleLogout}>
          <ListItemIcon><Icon>exit_to_app</Icon></ListItemIcon>
          <ListItemText inset primary="Sign out" />
        </MenuItem>
      </Menu>
    );
  }

  render() {
    const { classes, navigation, adminNavigation } = this.props;

    return(
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            className={classes.toggleBtn} color="inherit"
            onClick={this.props.onToggle}
          >
            <Icon>menu</Icon>
          </IconButton>
          <img className={classes.logo} alt="MeteorScada" src={IMG_LOGO}/>
          <div className={classes.separator} />
          {adminNavigation.map(item => this.renderTitleRoute(item))}
          {navigation.map(item => this.renderTitleRoute(item))}
          <IconButton color="inherit">
            <Icon>notifications</Icon>
          </IconButton>
          <IconButton color="inherit" onClick={this.handleAccountMenu}>
            <Icon>account_circle</Icon>
          </IconButton>
          {this.renderAccountMenu()}
        </Toolbar>
      </AppBar>
    );
  }
}

AppNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onToggle: PropTypes.func,
  navigation: PropTypes.array.isRequired,
  adminNavigation: PropTypes.array.isRequired,
};

const styles = theme => ({
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
    height: 56,
    [theme.breakpoints.up('sm')]: { height: 64 },
  },
  toolBar: {

    paddingLeft: 10,
    paddingRight: 10,
  },
  toggleBtn: {
    marginLeft: -4,
    marginRight: -4,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    paddingLeft: 10,
    paddingRight: 10,
  },
  separator: {
    marginLeft: 10,
    marginRight: 10,
    borderLeft: '1px solid',
    borderLeftColor: theme.palette.primary.light,
    borderRight: '1px solid',
    borderRightColor: theme.palette.primary.dark,
    height: 42,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    flex: 1,
    display: 'flex',
  },
  titleMain: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleSecondary: {
    paddingLeft: 10,
    paddingRight: 10,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  titleSeparator: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }
});

export default withStyles(styles)(withRouter(AppNavigation));
