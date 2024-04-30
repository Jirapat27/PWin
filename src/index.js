import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignIn from './App/SignIn';
import Homepage from './App/Homepage';
import MarkWin from './App/MarkWin';
import Userpage from './App/Userpage';
import Comments from './App/Comments';
// import Login from './App/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import Switch for exact matching

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/home" component={Homepage} />
        <Route path="/markwin" component={MarkWin} />
        <Route path="/user" component={Userpage} />
        <Route path="/comment" component={Comments} />
        {/* Add more routes as needed */}
      </Switch>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
