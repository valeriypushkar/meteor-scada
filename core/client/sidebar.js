import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'

import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Hidden from 'material-ui/Hidden'
import Icon from 'material-ui/Icon'
import Collapse from 'material-ui/transitions/Collapse'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

import { IMG_LOGO } from '../../resources/catalog'

/**
 * SCADA application side navigation bar.
 * @private
 */
class SideBar extends Component {
  state = { open: false };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  renderMenu() {
    const { classes } = this.props;

    return(
      <React.Fragment>
        <List component="nav">
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <Icon className={classes.icon}>settings</Icon>
            </ListItemIcon>
            <ListItemText primary="Administrator" />
            <Icon className={classes.expandIcon}>
              {this.state.open ? "expand_less" : "expand_more"}
            </Icon>
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.submenu}>
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem button className={classes.submenu}>
                <ListItemText primary="Users" />
              </ListItem>
              <ListItem button className={classes.submenu}>
                <ListItemText primary="Devices" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <Icon className={classes.icon}>dashboard</Icon>
            </ListItemIcon>
            <ListItemText primary="User menu" />
          </ListItem>
        </List>
      </React.Fragment>
    );
  }

  render() {
    const { classes } = this.props;

    return(
      <React.Fragment>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent" open
            classes={{paper: classes.drawerPaper}}
          >
            <div className={classes.toolbar} />
            {this.renderMenu()}
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={this.props.mobileOpen}
            onClose={this.props.onClose}
            classes={{paper: classes.drawerPaper}}
            ModalProps={{keepMounted: true}}
          >
            <div className={classes.toolbar} />
            <Divider />
            {this.renderMenu()}
          </Drawer>
        </Hidden>
      </React.Fragment>
    );
  }
}


SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  mobileOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

const drawerWidth = 240;

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  icon: {
    margin: 0,
  },
  expandIcon: {
    color: theme.palette.action.active,
  },
  submenu: {
    paddingLeft: theme.spacing.unit * 4,
  }
});

export default withStyles(styles)(SideBar);
