import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../firebase';
import axios from 'axios';

import './signin.css';
// styles

const logger = console;

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    };
  }

  signIn() {
    logger.log('this.state', this.state);
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        logger.log('this is the user:', user);
        this.setState({
          email: '',
          password: ''
        });
        sessionStorage.setItem('username', email);
        this.props.history.push('/listen');
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    return (
      <div className='form-inline signinMain'>
        <h2 style={{margin:0}}>Sign In</h2>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            value={this.state.email}
            style={{ marginRight: '5px' }}
            placeholder='email'
            onChange={event => this.setState({ email: event.target.value })}
          />
          <input
            className='form-control'
            type='password'
            value={this.state.password}
            style={{ marginRight: '5px' }}
            placeholder='password'
            onChange={event => this.setState({ password: event.target.value })}
          />
          <button
            className='btn btn-primary signinButton'
            type='button'
            onClick={() => this.signIn()}
          >
            Sign In
          </button>
        </div>
        <div>{this.state.error.message}</div>
        <div><Link to={'/signup'}>Sign up instead</Link></div>
      </div>
    );
  }
}

export default SignIn;
