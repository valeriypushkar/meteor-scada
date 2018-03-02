import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Reboot from 'material-ui/Reboot'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import MeteorScada from '../common/namespace'
import LoginPage from './login'
import MainLayout from './layout'

// TODO: more advanced theme management in separate file
const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
});

function renderMain() {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    return (<Redirect to="/login"/>);
  } else {
    return (<MainLayout/>);
  }
}

Meteor.startup(() => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Reboot/>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route path="/" render={renderMain}/>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('react-root')
  );
});
