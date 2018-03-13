import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'

import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Hidden from 'material-ui/Hidden'
import Icon from 'material-ui/Icon'
import Collapse from 'material-ui/transitions/Collapse'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

/**
 * SCADA application side navigation bar.
 * @private
 */
class SideNavigation extends Component {
  state = { expanded: {} };

  _handleExpand = (name) => () => {
    const { expanded } = this.state;
    expanded[name] = !expanded[name];
    this.setState({ expanded: expanded });
  };

  _handleClick = () => {
    if (this.props.mobileOpen) {
      this.props.onClose();
    }
  }

  _renderMenu() {
    const { navigation, adminNavigation } = this.props;

    return(
      <List component="nav">
        {this._renderMenuItems(adminNavigation)}
        {adminNavigation.length && <Divider />}
        {this._renderMenuItems(navigation)}
      </List>
    );
  }

  _renderMenuItems(items) {
    return items.map(item =>
      (item.children.length && item.children[0].type === 'submenuitem') ?
        this._renderSubMenu(item) : this._renderMenuItem(item));
  }

  _renderMenuItem(item) {
    const { classes } = this.props;
    const path = '/' + item.name;

    return (
      <ListItem key={item.name} button onClick={this._handleClick}
        component={NavLink} to={path} activeClassName={classes.selected}
      >
        <ListItemIcon>
          <Icon className={classes.icon}>{item.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItem>
    );
  }

  _renderSubMenu(item) {
    const { classes } = this.props;
    const path = '/' + item.name;
    const expanded = this.state.expanded[item.name];

    return (
      <React.Fragment key={item.name}>
        <Route path={path} children={({ match }) => (
          <ListItem button onClick={this._handleExpand(item.name)}
            className={match && !expanded ? classes.selected : ''}
          >
            <ListItemIcon>
              <Icon className={classes.icon}>{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.title} />
            <Icon className={classes.expandIcon}>
              {expanded ? "expand_less" : "expand_more"}
            </Icon>
          </ListItem>
        )} />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map(item => this._renderSubMenuItem(item, path))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }

  _renderSubMenuItem(item, parentPath) {
    const { classes } = this.props;
    const path = parentPath + '/' + item.name;

    return (
      <ListItem key={item.name} button
        className={classes.submenu} onClick={this._handleClick}
        component={NavLink} to={path} activeClassName={classes.selected}
      >
        <ListItemText primary={item.title} />
      </ListItem>
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
            {this._renderMenu()}
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
            {this._renderMenu()}
          </Drawer>
        </Hidden>
      </React.Fragment>
    );
  }
}


SideNavigation.propTypes = {
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
    [theme.breakpoints.up('md')]: { position: 'relative', },
  },
  icon: {
    margin: 0,
  },
  expandIcon: {
    color: theme.palette.action.active,
  },
  submenu: {
    paddingLeft: theme.spacing.unit * 4,
  },
  selected: {
    background: theme.palette.action.selected,
  }
});

export default withStyles(styles)(SideNavigation);
