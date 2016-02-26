import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actions as patientActions } from '../redux/modules/patient';
import Panel from 'components/Panel';
import Icon from 'components/Icon';
import { TextArea, Select } from 'components/widgets';
import { Link } from 'react-router';
import styles from './BackgroundHistoryView.scss';

const mapStateToProps = (state) => ({
  activePatient: state.patients.activePatient
});

const QUESTIONNAIRE_BASE_URL = 'https://kc.kobotoolbox.org/api/v1';
const QUESTIONNAIRE_ID = 36568;
const QUESTIONNAIRE_DATA_URL = `${QUESTIONNAIRE_BASE_URL}/data/${QUESTIONNAIRE_ID}?format=jsonp`;
const QUESTIONNAIRE_MRN_KEY = 'MedicallRecordNumber/mrn';

const COMORBILITIES_QUESTION_KEY_MAP = {
  'Comorbidities/co1_ht': 'High blood pressure?',
  'Comorbidities/co2_ihd': 'Heart disease?',
  'Comorbidities/co3_hypercholesterolemia': 'High cholesterol?',
  'Comorbidities/co4_diabetes': 'Diabetes mellitus?',
  'Comorbidities/co4_dm_tx': 'How do you control your diabetes?',
  'Comorbidities/co5_heammorhoids': 'Haemorrhoids?',
  'Comorbidities/co6_abdo_surgery': 'Abdominal surgery?',
  'Comorbidities/co7_hip_replacement': 'Hip replacement?',
  'Medications/med2_blood_thinner': 'Do you take blood thinners?',
  'Medications/med1_allergy': 'Are you alelrgic to medications?',
};

export class BackgroundHistoryView extends Component {
  constructor () {
    super();
  };

  componentWillMount () {
    window['callback'] = function (data) {
      this.processAllFormData(data);
    }.bind(this);
  };

  componentDidMount () {
    this.requestKoBoToolboxDataWithJSONP();
  };

  processAllFormData = (data) => {
    let activePatientMrn = this.props.activePatient.mrn;

    let activePatientForms = data.filter((d) => {
      if (parseInt(d[QUESTIONNAIRE_MRN_KEY], 10) === parseInt(activePatientMrn, 10)) {
        return d;
      }
    });

    activePatientForms.sort((a, b) => {
      return Date.parse(b._submission_time) - Date.parse(a._submission_time);
    });

    // Get the latest only.
    const activePatientForm = activePatientForms[0];

    this.props.setNewPatientResponses(activePatientForm);
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

  componentWillUnmount () {
    document.getElementById('kobotoolbox-jsonp').remove();
    this.props.removeNewPatientResponses();
    window['callback'] = undefined;
  };

  getBackgroundString = () => {
    const newPatientResponses = this.props.activePatient.newPatientResponses;
    if (newPatientResponses) {
      let background = '';
      if (newPatientResponses['Comorbidities/co2_ihd'] === 'yes') {
        background += 'Heart disease\n';
      }
      if (newPatientResponses['Comorbidities/co5_heammorhoids'] === 'yes') {
        background += 'Haemorrhoids\n';
      }
      if (newPatientResponses['Comorbidities/co6_abdo_surgery'] !== 'no') {
        const abdominalSurgeryType = newPatientResponses['Comorbidities/co6_abdo_surgery'];
        background += `Abdominal surgery (${abdominalSurgeryType})\n`;
      }
      if (newPatientResponses['Comorbidities/co7_hip_replacement'] !== 'nil') {
        const hipReplacementType = newPatientResponses['Comorbidities/co7_hip_replacement'];
        background += `Hip replacement (${hipReplacementType})\n`;
      }
      // quick hack for agile day. Dont know why 'undefined' is prepended.
      return background.replace(/, $/g, '').replace(/^undefined/g, '');
    } else {
      return ' ';
    }
  };

  verify = (e) => {
    e.preventDefault();
    const newPatientResponses = this.props.activePatient.newPatientResponses;
    const diabetes = (newPatientResponses['Comorbidities/co4_diabetes'] === 'yes');
    // const diabetes = (newPatientResponses['Comorbidities/co4_diabetes'] === 'yes') ? true : false;
    const hypertension = (newPatientResponses['Comorbidities/co2_ihd'] === 'yes');
    const hypercholesterolemia = (newPatientResponses['Comorbidities/co3_hypercholesterolemia'] === 'yes');
    const allergies = (newPatientResponses['Medications/med1_allergy'] === 'yes');
    const bloodThinners = (newPatientResponses['Medications/med2_blood_thinner'] === 'yes');
    this.props.updateBackgroundHistory(
      diabetes,
      null,
      hypertension,
      hypercholesterolemia,
      this.getBackgroundString(),
      allergies,
      bloodThinners,
    );
  };

  render () {
    const backgroundHistory = this.props.activePatient.backgroundHistory;
    const newPatientResponses = this.props.activePatient.newPatientResponses;

    if (newPatientResponses) {
      let question_responses = [];
      for (var property in COMORBILITIES_QUESTION_KEY_MAP) {
        if (COMORBILITIES_QUESTION_KEY_MAP.hasOwnProperty(property)) {
          question_responses.push(
            <tr key={COMORBILITIES_QUESTION_KEY_MAP[property]}>
              <td>
                <b>{COMORBILITIES_QUESTION_KEY_MAP[property]}</b>
                {' '}
                {newPatientResponses[property]}
              </td>
            </tr>
          );
        }
      };

      const systemDataClassName = (backgroundHistory.saved) ? styles['bhv-system-data-full'] : styles['bhv-system-data'];

      const questionnaireDetails = () => {
        if (backgroundHistory.saved) {
          return null;
        } else {
          return (
            <Panel title='Patient Questionnaire' className={styles['bhv-questionnaire-data']}>
              <table className={styles['bhv-questionnaire-results']}>
                <tbody>
                  {question_responses}
                </tbody>
              </table>
              <button onClick={this.verify}>
                <Icon name='arrow-left' />
                {' '}
                Reconcile
              </button>
            </Panel>
          );
        }
      };

      const allergicToWidget = () => {
        if (backgroundHistory.allergies) {
          return (
            <TextArea
              label='Allergic to'
              labelClassName={styles['bhv-background-textarea-label']}
              className={styles['bhv-background-textarea']}
              value={backgroundHistory.allergicTo}
              onChange={(e) => {
                const allergicTo = e.target.value;
                this.props.backgroundHistoryChangeAllergicTo(allergicTo);
              }}
            />
          );
        } else {
          return null;
        }
      };

      return (
        <div>
          <Panel title='Background History' className={systemDataClassName}>
            <Select
              label='Diabetes Mellitus'
              options={[
                {key: 'Yes', value: true},
                {key: 'No', value: false},
              ]}
              value={backgroundHistory.diabetes}
              onChange={(e) => {
                const diabetes = (e.target.value === 'Yes');
                this.props.backgroundHistoryChangeDiabetes(diabetes);
              }}
              />
            <Select
              label='Hypertension'
              options={[
                {key: 'Yes', value: true},
                {key: 'No', value: false},
              ]}
              value={backgroundHistory.hypertension}
              onChange={(e) => {
                const hypertension = (e.target.value === 'Yes');
                this.props.backgroundHistoryChangeHypertension(hypertension);
              }}
              />
            <Select
              label='Hypercholesterolemia'
              options={[
                {key: 'Yes', value: true},
                {key: 'No', value: false},
              ]}
              value={backgroundHistory.hypercholesterolemia}
              onChange={(e) => {
                const hypercholesterolemia = (e.target.value === 'Yes');
                this.props.backgroundHistoryChangeHypercholesterolemia(hypercholesterolemia);
              }}
              />
            <TextArea
              label='History of Previous Illnesses'
              value={backgroundHistory.background}
              ref='background'
              labelClassName={styles['bhv-background-textarea-label']}
              className={styles['bhv-background-textarea']}
              onChange={(e) => {
                const background = e.target.value;
                this.props.backgroundHistoryChangeBackground(background);
              }}
              />
            <Select
              label='Blood Thinners'
              options={[
                {key: 'Yes', value: true},
                {key: 'No', value: false},
              ]}
              value={backgroundHistory.bloodThinners}
              onChange={(e) => {
                const bloodThinners = (e.target.value === 'Yes');
                this.props.backgroundHistoryChangeBloodThinners(bloodThinners);
              }}
              />
            <Select
              label='Allergies'
              options={[
                {key: 'Yes', value: true},
                {key: 'No', value: false},
              ]}
              value={backgroundHistory.allergies}
              onChange={(e) => {
                const allergies = (e.target.value === 'Yes');
                this.props.backgroundHistoryChangeAllergies(allergies);
              }}
              />
            {allergicToWidget()}
            <button onClick={this.props.saveBackgroundHistory}>Save</button>
          </Panel>
          {questionnaireDetails()}
          <Link to='https://kc.kobotoolbox.org/fivium/forms/New_Pt_V1_0/enter-data' target='_blank'>
            Enter data in a new questionnaire
            {' '}
            <Icon name='external-link' />
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <h2>
            <Icon name='refresh' spin />
            {' '}
            Loading from KoBo Toolbox...
          </h2>
          <Link to='https://kc.kobotoolbox.org/fivium/forms/New_Pt_V1_0/enter-data' target='_blank'>
            Enter data in a new questionnaire
            {' '}
            <Icon name='external-link' />
          </Link>
        </div>
      );
    }
  };
};

export default connect(mapStateToProps, patientActions)(BackgroundHistoryView);

BackgroundHistoryView.propTypes = {
  activePatient: React.PropTypes.object,
  setNewPatientResponses: React.PropTypes.func,
  removeNewPatientResponses: React.PropTypes.func,
  updateBackgroundHistory: React.PropTypes.func,
  saveBackgroundHistory: React.PropTypes.func,
  backgroundHistoryChangeDiabetes: React.PropTypes.func,
  backgroundHistoryChangeHypertension: React.PropTypes.func,
  backgroundHistoryChangeHypercholesterolemia: React.PropTypes.func,
  backgroundHistoryChangeAllergies: React.PropTypes.func,
  backgroundHistoryChangeBloodThinners: React.PropTypes.func,
  backgroundHistoryChangeBackground: React.PropTypes.func,
  backgroundHistoryChangeAllergicTo: React.PropTypes.func,
};
