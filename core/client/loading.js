import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

/**
 * Component renders loading status.
 * @public
 */
class LoadingPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CircularProgress className={classes.progress} size={80} />
        <Typography className={classes.title} variant="title">
          Loading...
        </Typography>
      </div>
    );
  }
}

LoadingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  progress: {
    marginTop: '80px',
  },
  title: {
    marginTop: '20px',
  }
});

export default withStyles(styles)(LoadingPage);
