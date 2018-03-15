import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'

/**
 * SCADA application tab navigation bar.
 * @private
 */
class TabNavigation extends Component {
  state = {
    currentTab: 0,
  };

  handleTabChange = (event, value) => {
    this.setState({ currentTab: value });
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.currentTab >= nextProps.tabNavigation.length) {
      this.setState({ currentTab: 0 });
    }
  }

  render() {
    const { classes, tabNavigation } = this.props;
    const { currentTab } = this.state;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} color="default">
          <Tabs value={currentTab} fullWidth scrollable
            onChange={this.handleTabChange}
          >
            {tabNavigation.map(item =>
              <Tab key={item.name} label={item.title} />
            )}
          </Tabs>
        </AppBar>
        {React.createElement(tabNavigation[currentTab].component)}
      </div>
    );
  }
}

TabNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  tabNavigation: PropTypes.array.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 48,
    backgroundColor: theme.palette.background.default,
  },
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer - 1,
    height: 48,
    top: 56,
    [theme.breakpoints.up('sm')]: { top: 64 },
    left: 0,
    [theme.breakpoints.up('md')]: { left: 260 },
  },
  content: {
    //paddingTop: 48,
  }
});

export default withStyles(styles)(TabNavigation);
