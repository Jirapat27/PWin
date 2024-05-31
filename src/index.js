import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Homepage from './App/Homepage';
import MarkWin from './App/MarkWin';
import Userpage from './App/Userpage';
import Comments from './App/Comments';
import Login from './App/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

import HeaderAdmin from './Component/HeaderAdmin';
import { SideBar } from './Component/SideBar';
import Reports from './App/Reports';

import { EmailProvider } from './EmailContext'; // Import EmailProvider

const App = () => {
  const location = useLocation();

  return (
    <React.StrictMode>
      <Switch>
        <Route exact path="/" component={Login} />
        {location.pathname !== '/' && (
          <>
            <HeaderAdmin />
            <div className="flex">
              <SideBar />
              <Route path="/home" component={Homepage} />
              <Route path="/markwin" component={MarkWin} />
              <Route path="/user" component={Userpage} />
              <Route path="/comment" component={Comments} />
              <Route path="/reports" component={Reports} />
            </div>
          </>
        )}
      </Switch>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <Router>
    <EmailProvider> {/* Wrap App with EmailProvider */}
      <App />
    </EmailProvider>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
