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

  _handleTabChange = (event, value) => {
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
        <AppBar position="static" color="default">
          <Tabs value={currentTab} fullWidth scrollable
            onChange={this._handleTabChange}
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
    backgroundColor: theme.palette.background.default,
  }
});

export default withStyles(styles)(TabNavigation);
