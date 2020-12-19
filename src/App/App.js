// Containers::
import Login from './Login/LoginContainer';
import Main from './Main/MainContainer';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
      </Router>
    </div>
  );
}

export default App;