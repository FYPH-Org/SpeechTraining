import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import speechT from './speechT.png';

class About extends Component {
  render() {
    return (
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
          <Link to="/">
            <button className='btn btn-primary'>Start Today!</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default About;
