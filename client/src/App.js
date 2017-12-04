import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import About from './components/About';
import Navigation from './components/Navigation';
import googleAPI from './components/googleAPI';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Route path='/' exact component={HomePage} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/about' component={About} />
        <Route path='/listen' component={googleAPI} />
      </div>
    );
  }
}

export default App;
