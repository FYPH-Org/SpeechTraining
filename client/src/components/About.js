import React, { Component } from 'react';
import './About.css';
import speechT from './speechT.png';

class About extends Component {
  render() {
    return (
      <div>
        <div className='container' >
          {/*<div className='bg'></div>*/}
          {/*<img src='speech_img.jpeg' class='img-responsive' />*/}
          <img src={speechT} alt='speech_img' className='img-responsive'/>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h1 className="panel-title">Improve Communication Skills with Speech Training<a href="#application.urlroot#/html/tags/html_h1_tag.cfm"></a></h1>
            </div>
          </div>
          {/*<div className ='well'>Improve Communication Skills with Speech Training</div>
          <br/>*/}
          <div className="panel panel-default">
            <div className="panel-body">Have confidence and make a good impression whenever you want, and wherever you are with Speech Training.  With the help of the Speech Training app you can learn English in a better and more effective way.  You can enhance your English with correct grammar and positive sentiments. </div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h1 className="panel-title">What it Does?<a href="#application.urlroot#/html/tags/html_h1_tag.cfm"></a></h1>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-body">The Speech Training app converts the speech of the user to text and analyzes the confidence, sentiment, and shows various options to correct the grammatical mistakes.</div>
          </div>
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h1 className="panel-title">Just follow TWO simple steps: <a href="#application.urlroot#/html/tags/html_h1_tag.cfm"></a></h1>
            </div>
          </div>
          {/*<div className='well'>Just follow TWO simple steps: </div>*/}
          <div className="panel panel-default">
            <div className="panel-body">1. Sign in.<br />2. Start exploring.</div>
          </div>
          <br />
          <h3>Start Today!</h3>
        </div>
      </div>
    );
  }
}

export default About;
