import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Question from './Question.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleItem: undefined,
      questions: [],
      answers: [],
      questionIndex : 1,
      answerIndex: 1
    };

    this.fetcherQuestions = this.fetcherQuestions.bind(this);
  }

  componentDidMount() {
    this.fetcherQuestions();
  }

  //REPLACE: once id is received from overview component getDerived state method will be removed...
  static getDerivedStateFromProps (props, state) {
    return {
      sampleItem: props
    };
  }

  fetcherQuestions() {
    let apiURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/qa/questions';
    let options = {
      url: apiURL,
      method: 'get',
      headers: { authorization: process.env.API_KEY },
      params: {
        product_id: this.props.item.id,
        page: 1,
        count: 5
      },
    };
    axios(options).then(data => {
      this.setState({questions: data.data.results})
    })
    .catch((err) => {
      console.log('error fetching data', err)
    })
  }


  render() {
    return (
      <div>
        <div>QUESTIONS AND ANSWERS</div>
        <input placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."></input>
        <div>{
            this.state.questions.map((item, index) => {
              return (
                <div key={item.question_id}>
                  {index <= this.state.questionIndex ? 'Q: ' + item.question_body : <></>}
                  <Question details={item}/>
                </div>
              )
            })

          }</div>
      </div>
    );
  }
}

export default QuestionList;
