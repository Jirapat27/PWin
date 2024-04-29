import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import Homepage from './App/Homepage';
import Login from './App/Login';
import reportWebVitals from './reportWebVitals';
import Userpage from './App/Userpage';
import Comments from './App/Comments';
import MarkWin from './App/MarkWin';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Homepage /> */}
    {/* <Login /> */}
    {/* <Userpage/> */}
    {/* <Comments/> */}
    <MarkWin/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// import React from 'react';
// import ReactDOM from 'react-dom';
// import './CSS/index.css';
// import Homepage from './App/Homepage';
// import Login from './App/Login';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter as Router, Route} from 'react-router-dom';
// import Userpage from './App/Userpage';

// ReactDOM.render(
//   <Router>
//     <React.StrictMode>


//         <Route exact path="/" component={Homepage} />
//         <Route exact path="homepage" component={Homepage} />
//         <Route path="/login" component={Login} />
//         <Route path="/user" component={Userpage} />
        


//     </React.StrictMode>
//   </Router>,
//   document.getElementById('root')
// );

// reportWebVitals();
