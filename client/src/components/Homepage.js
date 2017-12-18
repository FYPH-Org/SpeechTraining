import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../firebase';
import axios from 'axios';
import { FormControl, FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';
import './Homepage.css';

const logger = console;

class Homepage extends Component {
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

  signUp(event) {
    event.preventDefault();
    logger.log('this.state', this.state);
    const { email, password } = this.state;
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        logger.log('this is the user:', user);
        axios
          .post('http://localhost:4000/api/register', { username: user.email })
          .then(element => {
            logger.log('element: ', element.data);
          })
          .catch(err => {
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
      <div className='auth-form-register'>
        <div className='container-fluid container-auth-register'>
          <Row>
            <Col md={7}>
              <div className='jumbotron desc-register'>
                <h1 className='main-quote'>Introducing Speech Trainer!</h1>
                <br />
                <h2 className='quote'>
                  Helping you take your grammar a notch above
                </h2>
              </div>
            </Col>
            <Col md={4}>
              <div className='jumbotron login-container-register'>
                <form onSubmit={this.signUp.bind(this)} className='signup-main'>
                  <FormGroup>
                    <ControlLabel>Username</ControlLabel>
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
                    <button className='btn btn-success' type='submit'> Register </button>
                    <h4 className='text-center'>
                      If you already have an acount you can
                      <Link to='/signin' className='redirect-register'> Sign In</Link> here.
                    </h4>
                  </FormGroup>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Homepage;
