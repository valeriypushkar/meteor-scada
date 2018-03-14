import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import CssBaseline from 'material-ui/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import MeteorScada from '../common/namespace'
import LoginPage from './login'
import MainLayout from './layout'

// TODO: more advanced theme management in separate file
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
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
      <CssBaseline/>
      {MeteorScada._navigationProvider}
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
