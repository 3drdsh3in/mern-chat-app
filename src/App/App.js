// Containers::
import Login from './Login/LoginContainer';
import Main from './Main/MainContainer';
import Profile from './Profile/ProfileContainer';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Route path="/" exact component={Login}>
          <Login />
        </Route>
        <Route path="/main" exact component={Main}>
          <Main />
        </Route>
        <Route path="/profile/:id" component={Profile}>
          <Profile />
        </Route>
      </Router>
    </div>
  );
}

export default App;