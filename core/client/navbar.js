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

/**
 * SCADA application navigation bar.
 * @private
 */
class NavigationBar extends Component {
  state = {
    anchorEl: null,
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    Meteor.logout(() => this.props.history.push('/login'));
  }

  render() {
    const { classes } = this.props;

    return(
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit">
            <Icon>menu</Icon>
          </IconButton>
          <Typography className={classes.flex} variant="title" color="inherit">
            Meteor SCADA
          </Typography>
          <IconButton color="inherit">
            <Icon>notifications</Icon>
          </IconButton>
          <IconButton color="inherit" onClick={this.handleMenu}>
            <Icon>account_circle</Icon>
          </IconButton>
          <Menu
            id="menu-appbar" anchorEl={this.state.anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right' }}
            transformOrigin={{vertical: 'top', horizontal: 'right' }}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>
              <ListItemIcon><Icon>person_outline</Icon></ListItemIcon>
              <ListItemText inset primary="Profile settings" />
            </MenuItem>
            <Divider />
            <MenuItem onClick={this.handleLogout}>
              <ListItemIcon><Icon>exit_to_app</Icon></ListItemIcon>
              <ListItemText inset primary="Sign out" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const styles = theme => ({
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

export default withStyles(styles)(withRouter(NavigationBar));
