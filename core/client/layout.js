import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import MeteorScada from '../common/namespace'
import NavigationBar from './navbar'
import SideBar from './sidebar'

/**
 * Main layout of the SCADA application.
 * @private
 */
class MainLayout extends Component {
  state = {
    sideBarOpen: false,
  };

  handleSideBarToggle = () => {
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  }

  render() {
    const { classes } = this.props;
    const { sideBarOpen } = this.state;

    return(
      <div className={classes.root}>
        <NavigationBar onToggle={this.handleSideBarToggle}/>
        <SideBar mobileOpen={sideBarOpen} onClose={this.handleSideBarToggle}/>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>{'Main content'}</Typography>
        </main>
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(MainLayout);
