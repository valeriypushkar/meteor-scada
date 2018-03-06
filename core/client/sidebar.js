import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Hidden from 'material-ui/Hidden'
import List, { ListItemIcon, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

import { IMG_LOGO } from '../../resources/catalog'

/**
 * SCADA application side navigation bar.
 * @private
 */
class SideBar extends Component {
  renderMenu() {
    return(
      <React.Fragment>
        <List><ListItemText inset primary="Menu placeholder" /></List>
        <Divider />
        <List><ListItemText inset primary="Menu placeholder" /></List>
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
});

export default withStyles(styles)(SideBar);
