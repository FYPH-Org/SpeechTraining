import React, { Component } from 'react';

// textgears package
import textgears from 'textgears';
//
import Table from './Table';

const axios = require('axios');
const { getScore, textPlus } = require('./helpers/helper');



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
      grammarAnalysis: '',
      allErrors: null,
    };
    this.listen = this.listen.bind(this);
    this.analyze = this.analyze.bind(this);
    this.grammar = this.grammar.bind(this);
  }

  componentDidMount() {
    recognition.addEventListener('result', (e) => {
      let last = e.results.length - 1;
      let text = e.results[last][0].transcript;
      text =  text.charAt(0).toUpperCase() + text.substring(1);
      console.log('Text: ', text);
      console.log('Confidence: ' + e.results[0][0].confidence);
      console.log('Results: ', e.results);
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
    axios.post('http://localhost:4000/api/sentiment', { text }) //retun was missing
      .then((data) => {
        console.log('data: ', data.data);
        let { sentimentMagnitude, sentimentScore} = data.data
        const newScore = getScore(sentimentScore);
        this.setState({ sentimentMagnitude, sentimentScore, newScore });

      })
      .catch((err) => console.log('there was an error: ', err));
  }

  grammar(event) {
    event.preventDefault();
    textgears({
      key: 'SLWs2uA5eFKaj3e6',
      // text: this.state.text,
      text: 'My mother are a doctor, but my father is a angeneer. I has a gun.',
    }).then( (res) => {
      console.log('res: ', res);
      const allErrors = res.errors;
      this.setState({ allErrors });
      console.log('allErrors from api: ', allErrors);
      console.log('allErrors from state: ', this.state.allErrors);
      allErrors.forEach((err) => {
        console.log('bad part: ', err.bad);
        const better = err.better;
        better.forEach((better) => {
          console.log('suggestion: ', better);
        });
      });

      // let grammarAnalysis = JSON.stringify(res.errors);
      // const regex = /\{|\}|(.offset....|.length....|.id.............|\[|])/g;
      // const str = grammarAnalysis
      // const subst = ``;
      //
      // // The substituted value will be contained in the result variable
      // const result = str.replace(regex, subst).trim();
      // // console.log(result);
      // // console.log(result.length)
      // // const result1 = result.split('');
      // // console.log(result1);
      //
      // var newTest = JSON.stringify(result.replace(/,/g, ''));
      //
      // console.log('this is the newTest', newTest);
      // // console.log(grammarAnalysis);
      // // console.log(res.errors);
      // this.setState({ newTest });
      // // console.log(this.state.newTest);
      // // console.log(res.errors);
      // for (const error of res.errors) {
      //   console.log(error);
      //   console.log('Bad: %s. Better: %s', error.bad, error.better.join(', '));
      // }
    })
    .catch(err => console.log('there was an error in textgears: ', err));
  }

  renderTable() {
    console.log('inside render table: ', this.state.allErrors);
    return (
      this.state.allErrors &&
      <Table errors={this.state.allErrors} />
    );
  }

  render() {
    return (
      <div>
        <div>
          <button className='btn btn-primary' onClick={this.listen}>Talk</button>
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
      </div>
    );
  }
}

export default Demo;
