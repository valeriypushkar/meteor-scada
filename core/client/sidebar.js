import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'


/**
 * SCADA application side navigation bar.
 * @private
 */
class SideBar extends Component {
  render() {
    return(
      <div>
      </div>
    );
  }
}


SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  flex: {
    flex: 1,
  },
});

export default withStyles(styles)(SideBar);
