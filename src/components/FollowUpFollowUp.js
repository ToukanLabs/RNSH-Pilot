import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { actions as patientActions } from 'redux/modules/patient';
export const fields = ['date', 'prostateRTFinished', 'lastCourseRT', 'hormones',
 'systemicTherapy', 'alphaBlocker', 'anticholinergic', 'currentFU', 'doctor', 'nocturia',
 'biochemicalFailure', 'BFdate', 'comments'];
import FollowUpDoctorSelect from './FollowUpDoctorSelect';
import {
  DateTimeInput,
  TextInput,
  Select,
  InlineWidgetGroup,
  TextArea,
} from './widgets';
import styles from './FollowUpFollowUp.scss';

const mapStateToProps = (state) => ({
  activePatient: state.router.path,
});

const mapDispatchToProps = (dispatch) => {
  return {
    patientActions: bindActionCreators(patientActions, dispatch),
  };
};

export class FollowUpFollowUp extends Component {
  constructor () {
    super();

    this.state = {
      alphaBlocker: false,
      biochemicalFailure: false,
      metastases: false,
    };
  }

  handleAlphaBlockerChange = (e) => {
    const alphaBlockerVal = e.target.value;
    let newVal = false;
    if (alphaBlockerVal === 'Yes') {
      newVal = true;
    }
    this.setState({
      alphaBlocker: newVal,
      biochemicalFailure: this.state.biochemicalFailure,
      metastases: this.state.metastases,
    });
  };

  handleBiochemicalFailureChange = (e) => {
    const biochemicalFailureVal = e.target.value;
    let newVal = false;
    let metastasesNewVal;
    if (biochemicalFailureVal === 'Yes') {
      newVal = true;
      metastasesNewVal = this.state.metastases;
    } else {
      metastasesNewVal = false;
    }
    this.setState({
      alphaBlocker: this.state.alphaBlocker,
      biochemicalFailure: newVal,
      metastases: metastasesNewVal,
    });
  };

  handleMetastasesChange = (e) => {
    const metastasesVal = e.target.value;
    let newVal = false;
    if (metastasesVal === 'Yes') {
      newVal = true;
    }
    this.setState({
      alphaBlocker: this.state.alphaBlocker,
      biochemicalFailure: this.state.biochemicalFailure,
      metastases: newVal,
    });
  };

  submit = (values, dispatch) => {
    const name = this.props.firstname + ' ' + this.props.surname;
    //this.props.patientActions.followUpPDF(values, this.props.mrn, name);
  };

  render () {
    const metastasesWidget = () => {
      if (this.state.biochemicalFailure) {
        return (
          <Select
            label='Metastases'
            options={[
              {key: 'Yes', value: 'Yes'},
              {key: 'No', value: 'No'},
            ]}
            onChange={this.handleMetastasesChange}
            />
        );
      } else {
        return null;
      }
    };

    const anticholinergicWidget = (anticholinergic) => {
      // if (this.state.alphaBlocker) {
      return (
        <Select
          {...anticholinergic}
          options={[
            {key: '0', value: '0'},
            {key: '1', value: '1'},
            {key: '2', value: '2'},
            {key: '3', value: '3'},
          ]}
          disabled={!this.state.alphaBlocker}
          />
      );
      // } else {
        // return null;
      // }
    };

    const dateOfBFWidget = (BFdate) => {
      if (this.state.biochemicalFailure) {
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

    const metastasesSiteAndDateWidgets = () => {
      if (this.state.metastases) {
        return (
          <span>
            <Select
              label='Site'
              options={[]}
              />
            <DateTimeInput
              label='Date'
              noTime
              />
          </span>
        );
      } else {
        return null;
      }
    };
    const {
      fields: {date, prostateRTFinished, lastCourseRT, hormones,
       systemicTherapy, alphaBlocker, anticholinergic, currentFU, doctor, nocturia,
       biochemicalFailure, BFdate, comments},
      handleSubmit,
      resetForm,
      submitting,
      } = this.props;
    return (
      <form className={styles['apv-form']} onSubmit={handleSubmit(this.submit)}>
        <div className={styles['fufu-row-one']}>
          <div className={styles['fufu-top-left-container']}>
            <div className={styles['fufu-tlc-one']}>
              <DateTimeInput
                label='FU Date'
                mandatory
                noTime
                value={this.props.data.date}
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
            <div className={styles['fufu-tlc-two']}>
              <Select
                {...hormones}
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
                  label='Alpha Blocker / Anticholinergic'
                  labelClassName={styles['fufu-alpha-blocker-label']}
                  options={[
                    {key: 'Yes', value: 'Yes'},
                    {key: 'No', value: 'No'},
                  ]}
                  onChange={this.handleAlphaBlockerChange}
                  />
                {' - '}
                {anticholinergicWidget(anticholinergic)}
              </InlineWidgetGroup>
            </div>

            <div className={styles['fufu-sub-panel-one']}>
              <Select
                {...currentFU}
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
            <div className={styles['fufu-sub-panel-two']}>
              <Select
                {...biochemicalFailure}
                label='Biochemical Failure'
                options={[
                  {key: 'Yes', value: 'Yes'},
                  {key: 'No', value: 'No'},
                  {key: 'UKN', value: 'UKN'},
                ]}
                onChange={this.handleBiochemicalFailureChange}
                />
              {dateOfBFWidget(BFdate)}
              {metastasesWidget()}

              {metastasesSiteAndDateWidgets()}
            </div>
          </div>

          <div className={styles['fufu-top-middle-container']}>
            <div className={styles['fufu-qol-container']}>
              <h3 className={styles['fufu-sub-heading-top']}>Quality of Life</h3>
              <Select
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
                  />
                +
                <TextInput />
              </InlineWidgetGroup>
              <InlineWidgetGroup>
                <TextInput
                  label='SF-12 PCS'
                  className={styles['fufu-sf']}
                  />
                <TextInput
                  label='SF-12 MCS'
                  className={styles['fufu-sf']}
                  />
              </InlineWidgetGroup>
              <div className={styles['fufu-dataimissing-info']}>
                ("-1" = data missing / NA)
              </div>
              <button>Get EPIC Scores</button>
              <button>Enter EPIC Data</button>
            </div>

            <div className={styles['fufu-hrqol-container']}>
              <h3>HRQOL Domain Scores</h3>
              <InlineWidgetGroup>
                <TextInput
                  label='Urinary'
                  />
                <TextInput
                  label='Sexual'
                  />
              </InlineWidgetGroup>
              <InlineWidgetGroup>
                <TextInput
                  label='Bowel'
                  />
                <TextInput
                  label='Hormonal'
                  />
              </InlineWidgetGroup>
              <TextInput
                label='Record ID in EPIC DB'
                disabled
                />
              <button>View All EPIC Data</button>
            </div>
          </div>

          <div className={styles['fufu-top-right-container']}>
            <h3 className={styles['fufu-sub-heading-top']}>Toxicity Assessment</h3>
            <button>Open Assessment Form</button>
            <button>Check All Assessments</button>
          </div>
        </div>
        <div className={styles['fufu-row-two-container']}>
          <div className={styles['fufu-row-two']}>
            <div className={styles['fufu-comments-container']}>
              <TextArea
                label='Comments'
                {...comments}
                />
            </div>
            <button onClick={(e) => {
              e.preventDefault();
              this.props.patientActions.followUpPDF();
            }}>Save</button>
            <div className={styles['fufu-second-cancer-container']}>
              <Select
                label='2nd Cancer'
                options={[
                  {key: 'Yes', value: 'Yes'},
                  {key: 'No', value: 'No'},
                ]}
                />
              <TextInput
                label='Date/Histology'
                />
            </div>
          </div>
        </div>
        <div>
          <button type='submit' disabled={submitting}>
            {submitting ? <i/> : <i/>} Save
          </button>
          <button type='button' disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    );
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'addFollowUp',
  fields,
})(FollowUpFollowUp));

FollowUpFollowUp.propTypes = {
  data: React.PropTypes.object,
  mrn: React.PropTypes.string,
  firstname: React.PropTypes.string,
  surname: React.PropTypes.string,
  patientActions: React.PropTypes.object,
  fields: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  resetForm: React.PropTypes.func,
  submitting: React.PropTypes.boolean,
};
