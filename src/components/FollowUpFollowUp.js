import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import { actions as patientActions } from 'redux/modules/patient';
import {bindActionCreators} from 'redux';
export const fields = ['id', 'date', 'prostateRTFinished', 'lastCourseRT', 'hormones',
 'systemicTherapy', 'alphaBlocker', 'anticholinergic', 'currentFU', 'doctor', 'nocturia',
 'biochemicalFailure', 'BFdate', 'metastases', 'site', 'metastasesDate', 'comments',
 'epicCompleted', 'ipssOne', 'ipssTwo', 'sf12pcs', 'sp12mcs', 'hrqolUrinary', 'hrqolSexual',
  'hrqolBowel', 'hrqolHormonal', 'secondCancer', 'dateHistology'];
import FollowUpDoctorSelect from './FollowUpDoctorSelect';
import {
  DateTimeInput,
  TextInput,
  Select,
  InlineWidgetGroup,
  TextArea,
} from './widgets';
import Panel from 'components/Panel';
import styles from './FollowUpFollowUp.scss';

const mapDispatchToProps = (dispatch) => {
  return {
    patientActions: bindActionCreators(patientActions, dispatch),
  };
};

export class FollowUpFollowUp extends Component {
  constructor () {
    super();
  }

  submit = (values, dispatch) => {
    const name = this.props.firstname + ' ' + this.props.surname;
    this.props.patientActions.saveFollowUp(values);
    this.props.patientActions.followUpPDF(values, this.props.mrn, name);
  };

  render () {
    const metastasesWidget = (metastases) => {
      if (biochemicalFailure.value === 'Yes') {
        return (
          <Select
            {...metastases}
            label='Metastases'
            options={[
              {key: 'Yes', value: 'Yes'},
              {key: 'No', value: 'No'},
            ]}
            />
        );
      } else {
        return null;
      }
    };

    const anticholinergicWidget = (anticholinergic) => {
      return (
        <Select
          {...anticholinergic}
          options={[
            {key: '0', value: '0'},
            {key: '1', value: '1'},
            {key: '2', value: '2'},
            {key: '3', value: '3'},
          ]}
          disabled={!alphaBlocker.value}
          />
      );
    };

    const dateOfBFWidget = (BFdate) => {
      if (biochemicalFailure.value === 'Yes') {
        return (
          <DateTimeInput
            label='Date of BF'
            noTime
            formField={BFdate}
            />
        );
      } else {
        return null;
      }
    };

    const metastasesSiteAndDateWidgets = (site, metastasesDate) => {
      if (metastases.value === 'Yes') {
        return (
          <span>
            <Select
              {...site}
              label='Site'
              options={[]}
              />
            <DateTimeInput
              label='Date'
              noTime
              formField={metastasesDate}
              />
          </span>
        );
      } else {
        return null;
      }
    };

    const saveControls = () => {
      if (this.props.enableFollowUpSave) {
        return (
          <div>
            <button type='submit' disabled={submitting}>
              {submitting ? <i/> : <i/>} Save
            </button>
            <button type='button' disabled={submitting} onClick={resetForm}>
              Clear Values
            </button>
          </div>
        );
      } else {
        return null;
      }
    };

    const {
      fields: {id, date, prostateRTFinished, lastCourseRT, hormones,
       systemicTherapy, alphaBlocker, anticholinergic, currentFU, doctor, nocturia,
       biochemicalFailure, BFdate, metastases, site, metastasesDate, comments, epicCompleted,
       ipssOne, ipssTwo, sf12pcs, sp12mcs, hrqolUrinary, hrqolSexual, hrqolBowel, hrqolHormonal,
       secondCancer, dateHistology},
      handleSubmit,
      resetForm,
      submitting,
      } = this.props;

    return (
      <Panel title={this.props.panelTitle} className={this.props.className}>
        <form key={id} className={styles.apvForm} onSubmit={handleSubmit(this.submit)}>
          <div className={styles.fufuRowOne}>
            <div className={styles.fufuTopLeftContainer}>
              <div className={styles.fufuTlcOne}>
                <DateTimeInput
                  label='FU Date'
                  mandatory
                  noTime
                  formField={date}
                  />
                <TextInput
                  label='Time from Prostate RT Finished'
                  unitLabel='months'
                  formField={prostateRTFinished}
                  />
                <TextInput
                  label='Time from Last Course of RT'
                  unitLabel='months'
                  formField={lastCourseRT}
                  />
              </div>
              <div className={styles.fufuTlcTwo}>
                <Select
                  {...hormones}
                  value={hormones.value || ''}
                  label='Current hormones'
                  options={[
                    {key: 'No', value: 'No'},
                    {key: 'Adjuvant', value: 'Adjuvant'},
                    {key: 'Relapse', value: 'Relapse'},
                    {key: 'UKN', value: 'UKN'},
                  ]}
                  />
                <Select
                  {...systemicTherapy}
                  value={systemicTherapy.value || ''}
                  label='Current Systemic Therapy'
                  options={[
                    {key: 'Nil', value: 'Nil'},
                    {key: 'Hormones', value: 'Hormones'},
                    {key: 'Chemotherapy', value: 'Chemotherapy'},
                    {key: 'Abiraterone/Enzalutamide', value: 'Abiraterone/Enzalutamide'},
                    {key: 'Other', value: 'Other'},
                  ]}
                  />
                <InlineWidgetGroup>
                  <Select
                    {...alphaBlocker}
                    value={alphaBlocker.value || ''}
                    label='Alpha Blocker / Anticholinergic'
                    labelClassName={styles.fufuAlphaBlockerLabel}
                    options={[
                      {key: 'Yes', value: 'Yes'},
                      {key: 'No', value: 'No'},
                    ]}
                    />
                  {' - '}
                  {anticholinergicWidget(anticholinergic)}
                </InlineWidgetGroup>
              </div>

              <div className={styles.fufuSubPanelOne}>
                <Select
                  {...currentFU}
                  value={currentFU.value || ''}
                  label='Current Follow-Up'
                  options={[
                    {key: 'Phone', value: 'Phone'},
                    {key: 'In-Person', value: 'In-Person'},
                  ]}
                  />
                <FollowUpDoctorSelect
                  label='Doctor'
                  formValue={doctor}
                  />
                <Select
                  {...nocturia}
                  value={nocturia.value || ''}
                  label='Nocturia'
                  options={[
                    {key: '0', value: '0'},
                    {key: '1', value: '1'},
                    {key: '2', value: '2'},
                    {key: '3', value: '3'},
                    {key: '4', value: '4'},
                    {key: '5', value: '5'},
                    {key: '6', value: '6'},
                    {key: '>=6', value: '>=6'},
                    {key: 'NA', value: 'NA'},
                  ]}
                  />
              </div>
              <div className={styles.fufuSubPanelTwo}>
                <Select
                  {...biochemicalFailure}
                  value={biochemicalFailure.value || ''}
                  label='Biochemical Failure'
                  options={[
                    {key: 'Yes', value: 'Yes'},
                    {key: 'No', value: 'No'},
                    {key: 'UKN', value: 'UKN'},
                  ]}
                  />
                {dateOfBFWidget(BFdate)}
                {metastasesWidget(metastases)}

                {metastasesSiteAndDateWidgets(site, metastasesDate)}
              </div>
            </div>

            <div className={styles.fufuTopMiddleContainer}>
              <div className={styles.fufuQolContainer}>
                <h3 className={styles.fufuSubHeadingTop}>Quality of Life</h3>
                <Select
                  {...epicCompleted}
                  value={epicCompleted.value || ''}
                  label='EPIC Completed'
                  options={[
                    {key: 'Yes', value: 'Yes'},
                    {key: 'No', value: 'No'},
                    {key: 'Yes, before RT', value: 'Yes, before RT'},
                    {key: 'Yes, completed but paperwork lost', value: 'Yes, completed but paperwork lost'},
                  ]}
                  />
                <InlineWidgetGroup>
                  <TextInput
                    label='IPSS'
                    formField={ipssOne}
                    />
                  +
                  <TextInput formField={ipssTwo}/>
                </InlineWidgetGroup>
                <InlineWidgetGroup>
                  <TextInput
                    label='SF-12 PCS'
                    className={styles.fufuSf}
                    formField={sf12pcs}
                    />
                  <TextInput
                    label='SF-12 MCS'
                    className={styles.fufuSf}
                    formField={sp12mcs}
                    />
                </InlineWidgetGroup>
                <div className={styles.fufuDataimissingInfo}>
                  ("-1" = data missing / NA)
                </div>
                <button>Get EPIC Scores</button>
                <button>Enter EPIC Data</button>
              </div>

              <div className={styles.fufuHrqolContainer}>
                <h3>HRQOL Domain Scores</h3>
                <InlineWidgetGroup>
                  <TextInput
                    label='Urinary'
                    formField={hrqolUrinary}
                    />
                  <TextInput
                    label='Sexual'
                    formField={hrqolSexual}
                    />
                </InlineWidgetGroup>
                <InlineWidgetGroup>
                  <TextInput
                    label='Bowel'
                    formField={hrqolBowel}
                    />
                  <TextInput
                    label='Hormonal'
                    formField={hrqolHormonal}
                    />
                </InlineWidgetGroup>
                <TextInput
                  label='Record ID in EPIC DB'
                  disabled
                  />
                <button>View All EPIC Data</button>
              </div>
            </div>

            <div className={styles.fufuTopRightContainer}>
              <h3 className={styles.fufuSubHeadingTop}>Toxicity Assessment</h3>
              <button>Open Assessment Form</button>
              <button>Check All Assessments</button>
            </div>
          </div>

          <div className={styles.fufuRowTwoContainer}>
            <div className={styles.fufuRowTwo}>
              <div className={styles.fufuSecondCancerContainer}>
                <InlineWidgetGroup>
                  <Select
                    {...secondCancer}
                    label='2nd Cancer'
                    options={[
                      {key: 'Yes', value: 'Yes'},
                      {key: 'No', value: 'No'},
                    ]}
                    />
                  <TextInput
                    label='Date/Histology'
                    formField={dateHistology}
                    />
                </InlineWidgetGroup>
              </div>
              <div className={styles.fufuCommentsContainer}>
                <TextArea
                  label='Comments'
                  {...comments}
                  value={comments.value || ''}
                  />
              </div>
            </div>
          </div>
          {saveControls()}
        </form>
      </Panel>
    );
  };
};
export default reduxForm({
  form: 'addFollowUp',
  fields,
},
state => ({
  initialValues: state.patients.activePatient.activeFollowUp
}),
mapDispatchToProps
)(FollowUpFollowUp);

FollowUpFollowUp.propTypes = {
  data: React.PropTypes.object,
  mrn: React.PropTypes.string,
  panelTitle: React.PropTypes.string,
  className: React.PropTypes.string,
  enableFollowUpSave: React.PropTypes.bool,
  firstname: React.PropTypes.string,
  surname: React.PropTypes.string,
  patientActions: React.PropTypes.object,
  fields: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  resetForm: React.PropTypes.func,
  submitting: React.PropTypes.func,
};
