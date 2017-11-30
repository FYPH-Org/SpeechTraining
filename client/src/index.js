import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { firebaseApp } from './firebase';
import './index.css';

import App from './App';


firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
      console.log('user has signed in or up', user);
  } else {
      console.log('user has signed out or still needs to sign in', )
  } 
})


ReactDOM.render(
  <Router>
    <App/>
  </Router>, document.getElementById('root'));

