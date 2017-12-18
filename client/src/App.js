import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import './App.css';

import Homepage from './components/Homepage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import About from './components/About';
import Navigation from './components/Navigation';
import googleAPI from './components/googleAPI';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navigation />
        <Route path='/' exact component={Homepage} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/about' component={About} />
        <Route path='/listen' component={googleAPI} />
      </div>
    );
  }
}

export default App;
