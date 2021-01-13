import { useState } from 'react';
import * as crypto from 'crypto';

// Containers:
import Login from './Login/LoginContainer';
import Main from './Main/MainContainer';
import Profile from './Profile/ProfileContainer';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';

function App() {
  // ClientId will NOT be reset & is immutable.
  const [clientId] = useState(crypto.randomBytes(32).toString('hex'));
  return (
    <div className="App">
      <Router basename="/">
        <Route path="/" exact component={Login}>
          <Login />
        </Route>
        <Route path="/main" exact component={Main}>
          <Main clientId={clientId} />
        </Route>
        <Route path="/profile/:id" exact component={Profile}>
          <Profile />
        </Route>
      </Router>
    </div>
  );
}

export default App;