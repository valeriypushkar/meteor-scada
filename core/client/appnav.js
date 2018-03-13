import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

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
    const { classes } = this.props;

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
          <Typography className={classes.title} variant="title" color="inherit">
            Title
          </Typography>
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
};

const styles = theme => ({
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
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
    borderLeft: '1px solid #5C6BC0', // FIXME: get color from theme
    borderRight: '1px solid #303F9F', // FIXME: get color from theme
    height: 42,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default withStyles(styles)(withRouter(AppNavigation));
