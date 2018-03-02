import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

import { IMG_LOGO } from '../../resources/catalog'

/**
 * MeteorScada login page.
 * Scada system should not allow unauthorized users get even a
 * read only access to the system. This is why the login page is always
 * full-screen. It cannot be activated from the main layout.
 * @private
 */
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ""};
  }

  handleLogin = (event) => {
    event.preventDefault();

    //const username = $("#username").val();
    //const password = $("#password").val();

    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        alert(error.reason, 'warning');
      } else {
        this.props.history.replace('/');
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container justify='center'>
        <Grid item xs={11} sm={7} md={5} lg={4} xl={3}>
          <Paper>
            <form noValidate autoComplete="off">
              <Grid container justify='center'>
                <Grid item xs={8}>
                  <img
                    className={classes.logo}
                    alt="Meteor SCADA"
                    src={IMG_LOGO}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id='username'
                    type='text'
                    label='Username'
                    margin='normal'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id='password'
                    type='password'
                    label='Password'
                    margin='normal'
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
   logo: {
     display: 'block',
     marginLeft: 'auto',
     marginRight: 'auto'
   }
 });

export default withRouter(withStyles(styles)(LoginPage));
