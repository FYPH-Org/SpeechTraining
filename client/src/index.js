import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router , Route , BrowserHistory } from 'react-router-dom';
import { firebaseApp } from './firebase';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import SignIn from './SignIn';
import SignUp from './SignUp';

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
      console.log('user has signed in or up', user);
  } else {
      console.log('user has signed out or still needs to sign in', )
  } 
})


ReactDOM.render(
  <Router path="/" history={BrowserHistory}>
    <Route path="/" exact component={App} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Router>, document.getElementById('root'));

