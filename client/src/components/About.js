import React, { Component } from 'react';
import './About.css';
import speechT from './speechT.png';

class About extends Component {
  render() {
    return (
      <div>
        <div className='container' >
          {/*<div class='bg'></div>*/}
          {/*<img src='speech_img.jpeg' class='img-responsive' />*/}
          <img src={speechT} alt='speech_img' class='img-responsive'/>
          <div className ='well'>Improve Communication Skills with Speech Training</div>
          <br/>
          <div className='panel'>Have confidence and make a good impression whenever you want, and wherever you are with Speech Training.  With the help of the Speech Training app you can learn English in a better and more effective way.  You can enhance your English with correct grammar and positive sentiments. </div>
          <br />
          <div className = 'well'>What it Does?</div>
          <div className='panel'>The Speech Training app converts the speech of the user to text and analyzes the confidence, sentiment, and shows various options to correct the grammatical mistakes.</div>
          <div className='well'>Just follow TWO simple steps: </div>
          <div className='well'>1. Sign in.</div>
          <div className='well'>1. Start exploring.</div>
          <br />
          <h3>Start Today!</h3>
        </div>
      </div>
    );
  }
}

export default About;
