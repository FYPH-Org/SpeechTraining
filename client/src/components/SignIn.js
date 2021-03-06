import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../firebase';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import Navigation from './Navigation';

import './signin.css';

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
    this.signIn = this.signIn.bind(this);
  }

  signIn(event) {
    event.preventDefault();
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
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
      <div className='signIn-background'>
        <Navigation />
        <div className='container'>
          <div className='jumbotron login-container-register signIn-container text-center'>
            <form onSubmit={this.signIn} className='signup-main'>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='email'
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  className='input-format-register'
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type='password'
                  placeholder='password'
                  value={this.state.password}
                  onChange={event => this.setState({ password: event.target.value })}
                  className='input-format-register'
                />
                <div>{this.state.error.message}</div>
                <div className="text-right">
                  <button className='btn btn-success' type='submit'> Sign In </button>
                </div>
                <h4 className='text-center'>
            If you don't already have an acount you can
                  <Link to='/' className='redirect-register'> Register</Link> here.
                </h4>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
