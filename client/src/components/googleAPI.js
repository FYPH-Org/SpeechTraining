import React, { Component } from 'react';
import Table from './Table';

const logger = console;

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
      isLoggedIn: false,
      text: '',
      sentimentScore: '',
      sentimentMagnitude: '',
      grammarAnalysis: '',
      allErrors: null,
    };
    this.listen = this.listen.bind(this);
    this.analyze = this.analyze.bind(this);
    this.grammar = this.grammar.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem('username')) {
      this.setState({ isLoggedIn: true });
    }
    recognition.addEventListener('result', (e) => {

      let last = e.results.length - 1;
      let text = e.results[last][0].transcript;

      logger.log('this is the e.results', e.results);
      text =  text.charAt(0).toUpperCase() + text.substring(1);
      logger.log('Text: ', text);
      logger.log('Confidence: ' + e.results[0][0].confidence);
      logger.log('Results: ', e.results);
      this.setState({ text });
    } );
    recognition.addEventListener('speechend', (e) => {
      logger.log('this is working again', e);
      this.refs.btn.removeAttribute('disabled', 'disabled');
    } );
  }

  listen(event) {

    event.preventDefault();
    recognition.start();
    logger.log('listening');
    this.refs.btn.setAttribute('disabled', 'disabled');

  }



  analyze(event) {

    event.preventDefault();
    const { text } = this.state;
    axios.post('http://localhost:4000/api/sentiment', { text }) //retun was missing
      .then((data) => {
        logger.log('data: ', data.data);
        let { sentimentMagnitude, sentimentScore } = data.data;
        const newScore = getScore(sentimentScore);
        this.setState({ sentimentMagnitude, sentimentScore, newScore });

      })
      .catch((err) => logger.log('there was an error: ', err));
  }

  grammar(event) {
    event.preventDefault();
    let { text } = this.state;
    // text = 'Hello is there';
    // text = 'My mother are a doctor, but my father is a angeneer. I has a gun.';
    axios.post('http://localhost:4000/api/grammar', { text })
      .then((element) => {
        logger.log('element data: ', element.data);
        const allErrors = element.data.errors;
        if (allErrors.length < 1) {
          this.setState({ noErrors: true, allErrors: null });
        } else {
          this.setState({ allErrors, noErrors: false });
        }
      })
      .catch((err) => {
        logger.log('error in text gears: ', err);
      });
  }

  renderTable() {
    logger.log('inside render table: ', this.state.allErrors);
    return (
      this.state.allErrors &&
      <Table errors={this.state.allErrors} />
    );
  }

  loggedIn() {
    if (this.state.isLoggedIn) {
      return <h1>You are logged in</h1>;
    }
    return <h1>Please log in</h1>;
  }

  noErrors() {
    return (
      this.state.noErrors &&
      <h1>The text is perfectly fine</h1>
    );
  }

  render() {
    return (
      <div>
        {/* {this.loggedIn()} */}
        <div>
          <button className='btn btn-primary' ref="btn" onClick={this.listen}>Talk</button>
          <p>{this.state.text}</p>
          <button className='btn btn-primary' onClick={this.analyze}>Analyze</button>
          <p>{this.state.sentimentScore}</p>
          <p>{this.state.sentimentMagnitude}</p>
          <p>{this.state.newScore}</p>
          <button className='btn btn-primary' onClick={this.grammar}>Grammar</button>
          <p>{this.state.newTest}</p>
          <hr />
        </div>
        {this.renderTable()}
        {this.noErrors()}
      </div>
    );
  }
}

export default Demo;
