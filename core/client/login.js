import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Dialog, { DialogContent, DialogTitle,
  withMobileDialog } from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Fade from 'material-ui/transitions/Fade'
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
  state = {
    username: '',
    password: '',
    failed: false
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      failed: false
    });
  }

  handleLogin = (event) => {
    event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        this.setState({ failed: true });
      } else {
        this.props.history.replace('/');
      }
    });
  }

  render() {
    const { classes, fullScreen } = this.props;

    return (
      <Dialog open={true} fullScreen={fullScreen} aria-labelledby="dlg-title">
        <DialogTitle id="dlg-title">
          <img className={classes.logoImg} alt="Login" src={IMG_LOGO}/>
        </DialogTitle>
        <DialogContent>
          <form noValidate onSubmit={this.handleLogin}>
            <TextField
              id='username' type='text' label='Username'
              margin='normal' fullWidth
              autoFocus autoComplete='on'
              inputProps={{
                autoCapitalize: 'none',
                autoCorrect: 'off',
                spellCheck: 'false'}}
              error={this.state.failed}
              value={this.state.username}
              onChange={this.handleChange('username')}
            />
            <TextField
              id='password' type='password' label='Password'
              margin='normal' fullWidth
              autoComplete='current-password'
              error={this.state.failed}
              value={this.state.password}
              onChange={this.handleChange('password')}
            />
            <Fade in={this.state.failed}>
              <Typography className={classes.errorMsg} variant="subheading">
                Incorrect username or password.
              </Typography>
            </Fade>
            <Button
              type='submit' className={classes.loginBtn}
              variant="raised" color="primary" size="large" fullWidth
            >
              LOGIN
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}


LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};

const styles = theme => ({
   logoImg: {
     display: 'block',
     marginLeft: 'auto',
     marginRight: 'auto',
   },
   loginBtn: {
     marginTop: '5%',
   },
   errorMsg: {
     marginTop: '5%',
     textAlign: 'center',
     color: theme.palette.error.main
   }
 });

export default withRouter(withMobileDialog()(withStyles(styles)(LoginPage)));
