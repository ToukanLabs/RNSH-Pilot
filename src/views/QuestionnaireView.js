import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as patientActions } from '../redux/modules/patient';
import QuestionnaireList from 'components/QuestionnaireList';
import QuestionnaireDetail from 'components/QuestionnaireDetail';
import Icon from 'components/Icon';
import styles from './QuestionnaireView.scss';

const mapStateToProps = (state) => ({
  activePatient: state.patients.activePatient
});

const QUESTIONNAIRE_BASE_URL = 'https://kc.kobotoolbox.org/api/v1';
const QUESTIONNAIRE_ID = 32115;
const QUESTIONNAIRE_DATA_URL = `${QUESTIONNAIRE_BASE_URL}/data/${QUESTIONNAIRE_ID}?format=jsonp`;
const QUESTIONNAIRE_MRN_KEY = 'demographics/mrn';

export class QuestionnaireView extends Component {
  constructor () {
    super();
    this.processAllFormData = this.processAllFormData.bind(this);
    this.handleDetailViewClick = this.handleDetailViewClick.bind(this);
  };

  componentWillMount () {
    window['callback'] = function (data) {
      this.processAllFormData(data);
    }.bind(this);
  };

  processAllFormData (data) {
    let activePatientMrn = this.props.activePatient.mrn;

    let activePatientForms = data.filter((d) => {
      if (parseInt(d[QUESTIONNAIRE_MRN_KEY], 10) === activePatientMrn) {
        return d;
      }
    });

    activePatientForms.sort((a, b) => {
      return Date.parse(b._submission_time) - Date.parse(a._submission_time);
    });

    this.props.setQuestionnaireResponses(activePatientForms);
  };

  // The below is using JSONP to allow Cross-origin requests, we wouldn't use
  // this is a production release we would most likely do a server-side request,
  // but this will be fine for now.
  requestKoBoToolboxDataWithJSONP () {
    let scriptTag = document.createElement('script');
    scriptTag.id = 'kobotoolbox-jsonp';
    scriptTag.type = 'text/javascript';
    scriptTag.src = QUESTIONNAIRE_DATA_URL;
    document.body.appendChild(scriptTag);
  };

  componentDidMount () {
    this.requestKoBoToolboxDataWithJSONP();
  };

  componentWillUnmount () {
    document.getElementById('kobotoolbox-jsonp').remove();
    this.props.removeQuestionnaireResponses();
  };

  handleDetailViewClick (id) {
    this.props.setQuestionnaireDetailViewId(id);
  }

  getQuestionnaireDetailData () {
    if (this.props.activePatient.questionnaireResponses) {
      return this.props.activePatient.questionnaireResponses.filter((q) => {
        if (q._id === this.props.activePatient.questionnaireDetailViewId) {
          return q;
        }
      })[0];
    } else {
      return undefined;
    }
  }

  render () {
    const activePatient = this.props.activePatient;
    const questionnaireResponses = activePatient.questionnaireResponses;
    if (questionnaireResponses === undefined) {
      return (
        <h2>
          <Icon name='refresh' spin />
          {' '}
          Loading from KoBo Toolbox...
        </h2>
      );
    } else if (questionnaireResponses.length === 0) {
      return (
        <h3>No questionnaires have been submitted for this patient.</h3>
      );
    } else {
      return (
        <div>
          <div className={styles['qv-questionnaire-list']}>
            <QuestionnaireList
              data={questionnaireResponses}
              selectedQuestionnaireId={activePatient.questionnaireDetailViewId}
              handleDetailViewClick={this.handleDetailViewClick}
              />
          </div>
          <div className={styles['qv-questionnaire-detail']}>
            <QuestionnaireDetail data={this.getQuestionnaireDetailData()} />
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, patientActions)(QuestionnaireView);

QuestionnaireView.propTypes = {
  activePatient: React.PropTypes.object,
  setQuestionnaireResponses: React.PropTypes.func,
  removeQuestionnaireResponses: React.PropTypes.func,
  setQuestionnaireDetailViewId: React.PropTypes.func,
};
