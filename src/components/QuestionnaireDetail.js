import React, { Component } from 'react';
import { FormattedTime, FormattedRelative } from 'react-intl';
import QuestionnaireQuestion from './QuestionnaireQuestion';
import styles from './QuestionnaireDetail.scss';
import corestyles from '../styles/core.scss';

const CATEGORY_KEY_MAP = {
  'rad_onc': 'Radiation Oncologist',
  'endocrine': 'Endocrine Treatment',
  'mammogram': 'Mammogram Details',
  'pt_self_assessment': 'Self Assessment',
};

const QUESTION_KEY_MAP = {
  'rad_onc/rad_onc': 'Who is your radiation oncologist?',
  'endocrine/endocrine_tx': 'Are you receiving endocrine treatment?',
  'endocrine/endocrine_drugs': 'What drugs are you taking?',
  'mammogram/mammogram_done': 'Have you had a mammogram in the past 12 months?',
  'mammogram/mammogram_result': 'What was the result of this mammogram?',
  'pt_self_assessment/breast_size': 'Breast size:',
  'pt_self_assessment/breast_shape': 'Breast shape:',
  'pt_self_assessment/nipple_pain': 'Nipple pain:',
  'pt_self_assessment/breast_pain': 'Breast pain:',
  'pt_self_assessment/breast_sensitivity': 'Breast sensitivity:',
  'pt_self_assessment/skin_irritation': 'Skin irritation:',
  'pt_self_assessment/under_breast_irritation': 'Irritation under the breast:',
  'pt_self_assessment/armpit_irritation': 'Irritation under the armpit:',
  'pt_self_assessment/upper_breast_irritation': 'Irritation in the upper inner breast area:',
  'pt_self_assessment/breast_tightness': 'Breast tightness:',
};

export default class QuestionnaireDetail extends Component {

  render () {
    if (this.props.data !== undefined) {
      let question_responses = [];
      let current_title = '';
      for (var property in QUESTION_KEY_MAP) {
        if (QUESTION_KEY_MAP.hasOwnProperty(property)) {
          // User the substring of the object property to indicate the section,
          // that is, everything up to the first slash.
          let this_title = property.substring(0, property.indexOf('/'));
          // If the current section (substring) does not match that of the
          // previous iteration then add a new h3 to the list of components
          // with the title of the new section in it.
          if (current_title !== this_title) {
            question_responses.push(
              <h3>{CATEGORY_KEY_MAP[this_title]}</h3>
            );
            current_title = this_title;
          }

          question_responses.push(
            <QuestionnaireQuestion
              key={property}
              question={QUESTION_KEY_MAP[property]}
              answer={this.props.data[property]} />
          );
        }
      }

      return (
        <div className={corestyles['panel']}>
          <h2>
            Breast Patient Follow-Up Questionnaire - <FormattedTime value={Date.parse(this.props.data._submission_time)} />
          </h2>
          <div className={styles['qd-relative-time']}>
            <FormattedRelative value={Date.parse(this.props.data._submission_time)} />
          </div>
          {question_responses}
        </div>
      );
    } else {
      return (
        <h3>Select a questionnaire.</h3>
      );
    }
  };

};

QuestionnaireDetail.propTypes = {
  data: React.PropTypes.object,
};
