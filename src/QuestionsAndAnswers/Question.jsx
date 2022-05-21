import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      display : 1
    };

  }

  render () {
    const answerObj = Object.values(this.props.details.answers);
    //const answerKey = Object.keys(this.props.details.answers);
    console.log(answerObj)
    return (
      <div>{answerObj.map((answer, index) => {
        return (
          <div key={answer.id}>
            {index <= this.state.display ? 'A:  ' + answer.body : <></>}
          </div>
        )
      })}</div>
    )
  }
}

export default Question;