import React, { Component } from 'react';
import { FormattedDate, FormattedTime, FormattedRelative } from 'react-intl';
import styles from './QuestionnaireList.scss';

export default class QuestionnaireList extends Component {

  render () {
    if (this.props.data === undefined) {
      return (
        null
      );
    } else if (this.props.data.length === 0) {
      return (
        <h3>No questionnaires have been submitted for this patient.</h3>
      );
    } else if (this.props.data !== undefined) {
      const questionnaire_rows = this.props.data.map((r) => {
        let rowClass;
        if (r._id === this.props.selectedQuestionnaireId) {
          rowClass = styles['ql-active'];
        }

        return (
          <tr key={r._id} className={rowClass}>
            <td>Breast Patient Follow-Up Questionnaire</td>
            <td>
              <FormattedDate
                value={Date.parse(r._submission_time)}
                />
              {' '}
              <FormattedTime
                value={Date.parse(r._submission_time)}
                hour='numeric'
                minute='numeric'
                />
              <div className={styles['ql-relative-time']}>
                <FormattedRelative value={Date.parse(r._submission_time)} />
              </div>
            </td>
            <td>
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  this.props.handleDetailViewClick(r._id);
                }}
                >
                  View
              </a>
            </td>
          </tr>
        );
      });

      return (
        <table>
          <thead>
            <tr>
              <th>Questionnaire</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {questionnaire_rows}
          </tbody>
        </table>
      );
    }
  };

};

QuestionnaireList.propTypes = {
  data: React.PropTypes.array,
  handleDetailViewClick: React.PropTypes.func,
  selectedQuestionnaireId: React.PropTypes.number,
};
