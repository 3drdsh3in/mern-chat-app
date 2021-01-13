import React, { useState } from 'react';
import { Redirect } from 'react-router';
import * as crypto from 'crypto';

// Containers:
import Login from './Login/LoginContainer';
import Main from './Main/MainContainer';
import Profile from './Profile/ProfileContainer';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clientId: '',
      redirect: false
    }
    this.setClientIdWrapper = this.setClientIdWrapper.bind(this);
    // this.setRedirectWrapper = this.setRedirectWrapper.bind(this);
  }
  // ClientId will NOT be reset & is immutable.
  setClientIdWrapper = async (id) => {
    this.setState({ clientId: id });
  }
  // setRedirectWrapper = (bool) => {
  //   this.setState({ redirect: bool });
  // }
  componentDidUpdate() {
    if (!this.state.redirect) {
      console.log(this.state.redirect);
      this.setState({ redirect: true });
    }
  }
  render() {
    if (this.props.AccountDetails && this.state.redirect == false) {
      if (Object.keys(this.props.AccountDetails.acc_data).length > 0 && this.props.AccountDetails.loggedOn == true) {
        this.setState({ clientId: crypto.randomBytes(32).toString('hex') });
      }
    }
    console.log(this.state.clientId);
    console.log(this.state.redirect);
    console.log(this.state.clientId !== '' && this.state.redirect === true)
    return (
      <div className="App">
        <Router basename="/">
          <Route path="/" exact component={Login}>
            <Login
              // setRedirectWrapper={this.setRedirectWrapper}
              setClientIdWrapper={this.setClientIdWrapper}
            />
            {/* Redirect Initiative */}
            {this.state.clientId !== '' && this.state.redirect === true
              ?
              <Redirect push to="/main" />
              :
              null
            }
          </Route>
          <Route path="/main" exact component={Main}>
            <Main
              clientId={this.state.clientId}
              setClientIdWrapper={this.setClientIdWrapper}
            />
          </Route>
          <Route path="/profile/:id" exact component={Profile}>
            <Profile />
          </Route>

        </Router>
      </div>
    );
  }
}

export default App;