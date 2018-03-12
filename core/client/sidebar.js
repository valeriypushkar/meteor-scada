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
  state = { expanded: {} };

  handleExpand = (name) => () => {
    const { expanded } = this.state;
    expanded[name] = !expanded[name];
    this.setState({ expanded: expanded });
  };

  renderMenuItem(item) {
    const { classes } = this.props;

    return (
      <ListItem key={item.name} button>
        <ListItemIcon>
          <Icon className={classes.icon}>{item.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItem>
    );
  }

  renderSubMenu(item) {
    const { classes } = this.props;
    const expanded = this.state.expanded[item.name];

    return (
      <React.Fragment key={item.name}>
        <ListItem button onClick={this.handleExpand(item.name)}>
          <ListItemIcon>
            <Icon className={classes.icon}>{item.icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={item.title} />
          <Icon className={classes.expandIcon}>
            {expanded ? "expand_less" : "expand_more"}
          </Icon>
        </ListItem>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map(item => this.renderSubMenuItem(item))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }

  renderSubMenuItem(item) {
    const { classes } = this.props;

    return (
      <ListItem key={item.name} button className={classes.submenu}>
        <ListItemText primary={item.title} />
      </ListItem>
    );
  }

  renderMenu() {
    const { navigation, adminNavigation } = this.props;

    return(
      <List component="nav">
        {adminNavigation.map(item =>
          (item.children.length && item.children[0].type === 'submenuitem') ?
            this.renderSubMenu(item) : this.renderMenuItem(item))}
        {adminNavigation.length && <Divider />}
        {navigation.map(item =>
          (item.children.length && item.children[0].type === 'submenuitem') ?
            this.renderSubMenu(item) : this.renderMenuItem(item))}
      </List>
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
  navigation: PropTypes.array.isRequired,
  adminNavigation: PropTypes.array.isRequired,
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
