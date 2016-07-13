import React, { Component } from 'react';
import styles from './QuestionnaireQuestion.scss';

export default class QuestionnaireQuestion extends Component {
  render () {
    if (this.props.answer === undefined) {
      return null;
    } else {
      return (
        <div className={styles['qq-question-group']}>
          <span className={styles['qq-question']}>
            {this.props.question}
          </span>
          <span className={styles['qq-answer']}>
            {this.props.answer}
          </span>
        </div>
      );
    }
  }
};

QuestionnaireQuestion.propTypes = {
  question: React.PropTypes.string,
  answer: React.PropTypes.string,
};
