import React, { Component } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.listen = this.listen.bind(this);
  }

  listen(event) {
    event.preventDefault();
    recognition.start();
    recognition.addEventListener('result', (e) => {
      let last = e.results.length - 1;
      let text = e.results[last][0].transcript;
      console.log('text: ', text);
      console.log('Confidence: ' + e.results[0][0].confidence);
      console.log('results: ', e.results);
      this.setState({ text });
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.listen}>Talk</button>
        <p>{this.state.text}</p>
      </div>
    );
  }
}

export default Demo;
