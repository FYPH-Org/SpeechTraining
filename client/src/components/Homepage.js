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
      // <div className='block'>
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
          <div className='block'>
          </div>
        {/* </div> */}
        <div className='about-container'>
          <div className='container'>
            <h1 className='about-main-title text-center'>Welcome to Speech Trainer</h1>
            <div className="panel panel-custom">
              <div className="panel-heading">
                <h1 className="panel-title panel-title-custom">Improve Communication Skills with Speech Training<a href="#application.urlroot#/html/tags/html_h1_tag.cfm"></a></h1>
              </div>
            </div>
            <div className="panel panel-body-box">
              <div className="panel-body">Have confidence and make a good
              impression whenever you want, and wherever you are with Speech
              Training.  With the help of the Speech Training app you can learn
               English in a better and more effective way. You can enhance your
                English with correct grammar and positive sentiments.
              </div>
            </div>
            <div className="panel panel-custom">
            <div className="panel-heading">
              <h1 className="panel-title panel-title-custom">What it Does?</h1>
            </div>
          </div>
          <div className="panel panel-body-box">
            <div className="panel-body">The Speech Training app converts the
              speech of the user to text and analyzes the confidence, sentiment,
               and shows various options to correct the grammatical mistakes.
            </div>
          </div>
          <div className="panel panel-custom">
            <div className="panel-heading">
              <h1 className="panel-title panel-title-custom">Just follow TWO simple steps:</h1>
            </div>
          </div>
          <div className="panel panel-body-box">
            <div className="panel-body">
              1. Sign in. <br />
              2. Start exploring.
            </div>
          </div>
          <br />
          
          </div>
        </div>
        <div className='block'>
      </div>

      <div className="main-container">
      <div className="left-container"></div>
      <div className="right-container">
          <div className="half-containers">
          What it Does? 
          <br />
          <br />
          <br />
           </div>
          <div className="half-containers">The Speech Training app converts the <br />
              speech of the user to text and analyzes the confidence, sentiment, <br />
               and shows various options to correct the grammatical mistakes. <br />
          </div>
      </div>
  </div>

  <div className='block'>
      </div>
      
      
      <Link to="/">
            <div className="text-center">
            <button className='btn btn-primary'>Start Today!</button>
            </div>
          </Link>
      
          <div className='block'> This is the end
      </div>

      <div className='footer'>
        This is the for now Footer
      </div>
      </div> // closing tag
      
      // <div >
      //   block left and block right
      // </div>
    );
  }
}

export default Homepage;
