import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../firebase';
import axios from 'axios';
// import ReactDOM from 'react-dom';
import './signin.css';
// styles

const logger = console;

// REVIEW: maybe change button action to click on enter

class SignUp extends Component {
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

  signUp() {
    logger.log('this.state', this.state);
    const { email, password } = this.state;
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        logger.log('this is the user:', user);
        axios.post('http://localhost:4000/api/register', { username: user.email })
          .then((element) => {
            logger.log('element: ', element.data);
          })
          .catch((err) => {
            logger.log('error saving user: ', err);
          });
        this.setState({
          email: '',
          password: ''
        });
        this.props.history.push('/listen');
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    return (
      <div className='form-inline signinMain'>
        <h2 style={{ margin:0 }}>Sign Up</h2>
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
            onClick={() => this.signUp()}
          >
            Sign Up
          </button>
        </div>
        <div>
          {this.state.error.message}
        </div>
        <div>
          <Link to={'/signin'}>Already a user? Sign in instead</Link>
        </div>
      </div>
    );
  }
}

export default SignUp;
