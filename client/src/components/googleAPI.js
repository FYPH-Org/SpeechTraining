import React, { Component } from 'react';
import Table from './Table';
import { ButtonToolbar } from 'react-bootstrap';
import './googleAPI.css';
import NavigationListen from './NavigationListen';
const logger = console;

const axios = require('axios');
const { getScore } = require('./helpers/helper');
var recognition;



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
    this.clear = this.clear.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
    }
    if (sessionStorage.getItem('username')) {
      this.setState({ isLoggedIn: true });
    }
    recognition.addEventListener('result', (e) => {
      let last = e.results.length - 1;
      let text = e.results[last][0].transcript;
      text =  text.charAt(0).toUpperCase() + text.substring(1);
      // logger.log('Confidence: ' + e.results[0][0].confidence);
      this.setState({ text });
    } );
    recognition.addEventListener('speechend', (e) => {
      this.refs.btn.removeAttribute('disabled', 'disabled');
    } );
  }

  listen(event) {
    this.setState({ allErrors: null });
    event.preventDefault();
    recognition.start();
    this.refs.btn.setAttribute('disabled', 'disabled');
  }



  analyze(event) {

    event.preventDefault();
    const { text } = this.state;
    axios.post('https://speech-training.herokuapp.com/api/sentiment', { text }) //retun was missing
      .then((data) => {
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
    axios.post(' https://speech-training.herokuapp.com/api/grammar', { text })
      .then((element) => {
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

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  renderTable() {
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

  clear() {
    this.setState({ text: '' });
  }

  render() {
    return (
      <div>
        <NavigationListen />
        <div className='background'>
          {/* <h1>Speech Trainer</h1> */}
          <div className='container'>
            <div className="form-group">
              <label className='pull-left'>Press talk and speak to record text, or enter text into the field</label>
              <textarea 
                className="form-control"
                rows="10"
                value={this.state.text}
                onChange={this.handleChange}
              >
              </textarea>
            </div>
            <ButtonToolbar className='pull-right'>
              <button className='btn btn-success' ref="btn" onClick={this.listen}>Talk</button>
              {/* <button className='btn btn-primary' onClick={this.analyze}>Analyze</button> */}
              <button className='btn btn-primary' onClick={this.clear}>clear</button>
              <button className='btn btn-primary' onClick={this.grammar}>Grammar</button>
            </ButtonToolbar>
            <div className='clearfix'></div>
            <p className='text'>{this.state.sentimentScore}</p>
            <p className='textmag'>{this.state.sentimentMagnitude}</p>
            <p className='textscore'>{this.state.newScore}</p>
            <p className='textgrammar'>{this.state.newTest}</p>
            <hr />
            {this.renderTable()}
            {this.noErrors()}
            <p className='text-muted'>
              The smart English grammar checker finds and corrects mistakes or wrong word usage in your
              text. The impression you make on people depends not only on what you write, but also on
              how correct your writing is. Write correct English grammar with TextGears and improve not
              only your text, but the impression you make on others!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Demo;
