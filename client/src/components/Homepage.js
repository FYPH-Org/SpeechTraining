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
          .post(' https://speech-training.herokuapp.com/api/register', { username: user.email })
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
      // <div className='block'>
      <div>
        <div className='auth-form-register'>
          <div className='container-fluid container-auth-register'>
            <Row className='text-center'>
              <Col md={7}>
                <div className='jumbotron desc-register'>
                  <h1 className='main-quote'>Introducing <br />Speech Trainer</h1>
                  <br />
                  <br />
                  <h3 className='quote'>
                  Helping you take your grammar a notch above
                  </h3>
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
                      <div className='text-right'>
                        <button className='btn btn-success btn-sm' type='submit'> Register </button>
                      </div>
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
          <div>
            <h4 className='text-center'>
              <a href="https://www.google.com/chrome/">Please use Google Chrome <br /> as your browser</a>
            </h4>
          </div>
        </div>
        <div className='about-section'>
          <div className='container-fluid about-intro'>
            <div className='container'>
              <h2>Welcome to Speech Trainer</h2>
              <hr />
              <p className='lead lead-custom'>
              Have confidence and make a good impression whenever you want,
              and wherever you are with Speech Training.  With the help of the 
              Speech Training app you can learn English in a better and more 
              effective way. You can enhance your English with correct grammar 
              and positive sentiments.
              </p>
            </div>
          </div>
          <div className='about-func container-fluid'>
            <div className="row about-func-row">
              <div className="col-sm-4 side-image"></div>
              <div className="col-sm-8 about-funct-des-container">
                <div className="container-fluid">
                  <div className="about-func-desc">
                    <h2>What it Does</h2>
                    <hr />
                    <p className='lead-custom'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam vel dolore odit quod deserunt nulla consequuntur sint, aspernatur ut reprehenderit natus, tempora perspiciatis! Alias iste blanditiis eaque similique facilis! Omnis?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
