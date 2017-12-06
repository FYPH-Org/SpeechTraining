import React, { Component } from 'react';
const axios = require('axios');
const { getScore } = require('./helpers/helper');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      sentimentScore: '',
      sentimentMagnitude: '',
    };
    this.listen = this.listen.bind(this);
    this.analyze = this.analyze.bind(this);
  }

  componentDidMount() {
    recognition.addEventListener('result', (e) => {
      let last = e.results.length - 1;
      let text = e.results[last][0].transcript;
      console.log('text: ', text);
      console.log('Confidence: ' + e.results[0][0].confidence);
      console.log('results: ', e.results);
      this.setState({ text });
    } );
  }

  listen(event) {
    event.preventDefault();
    recognition.start();
    console.log('listening');
  }

  analyze(event) {
    event.preventDefault();
    const { text } = this.state;
    return axios.post('http://localhost:4000/api/sentiment', { text })
      .then((data) => {
        console.log('data: ', data);
        let { sentimentMagnitude, sentimentScore} = data.data
        const newScore = getScore(sentimentScore);
        this.setState({ sentimentMagnitude, sentimentScore, newScore });

      })
      .catch((err) => console.log('there was an error: ', err));
  }

  render() {
    return (
      <div>
        <button className='btn btn-primary' onClick={this.listen}>Talk</button>
        <p>{this.state.text}</p>
        <button className='btn btn-primary' onClick={this.analyze}>analyze</button>
        <p>{this.state.sentimentScore}</p>
        <p>{this.state.sentimentMagnitude}</p>
        <p>{this.state.newScore}</p>
      </div>
    );
  }
}

export default Demo;
