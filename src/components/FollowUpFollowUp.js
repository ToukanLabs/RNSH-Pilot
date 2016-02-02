import React, { Component } from 'react';
import Panel from './Panel';
import FollowUpDoctorSelect from './FollowUpDoctorSelect';
import {
  DateTimeInput,
  TextInput,
  Select,
  InlineWidgetGroup,
  TextArea,
} from './widgets';
import styles from './FollowUpFollowUp.scss';

export default class FollowUpFollowUp extends Component {
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

    const anticholinergicWidget = () => {
      // if (this.state.alphaBlocker) {
      return (
        <Select
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

    const dateOfBFWidget = () => {
      if (this.state.biochemicalFailure) {
        return (
          <DateTimeInput
            label='Date of BF'
            noTime
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

    return (
      <Panel title={this.props.mainHeading}>
        <div className={styles['fufu-row-one']}>
          <div className={styles['fufu-top-left-container']}>
            <div className={styles['fufu-tlc-one']}>
              <DateTimeInput
                label='FU Date'
                mandatory
                noTime
                />
              <TextInput
                label='Time from Prostate RT Finished'
                unitLabel='months'
                />
              <TextInput
                label='Time from Last Course of RT'
                unitLabel='months'
                />
            </div>
            <div className={styles['fufu-tlc-two']}>
              <Select
                label='Current hormones'
                options={[
                  {key: 'No', value: 'No'},
                  {key: 'Adjuvant', value: 'Adjuvant'},
                  {key: 'Relapse', value: 'Relapse'},
                  {key: 'UKN', value: 'UKN'},
                ]}
                />
              <Select
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
                  label='Alpha Blocker / Anticholinergic'
                  labelClassName={styles['fufu-alpha-blocker-label']}
                  options={[
                    {key: 'Yes', value: 'Yes'},
                    {key: 'No', value: 'No'},
                  ]}
                  onChange={this.handleAlphaBlockerChange}
                  />
                -
                {anticholinergicWidget()}
              </InlineWidgetGroup>
            </div>

            <div className={styles['fufu-sub-panel-one']}>
              <Select
                label='Current Follow-Up'
                options={[
                  {key: 'Phone', value: 'Phone'},
                  {key: 'In-Person', value: 'In-Person'},
                ]}
                />
              <FollowUpDoctorSelect
                label='Doctor'
                />
              <Select
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
                label='Biochemical Failure'
                options={[
                  {key: 'Yes', value: 'Yes'},
                  {key: 'No', value: 'No'},
                  {key: 'UKN', value: 'UKN'},
                ]}
                onChange={this.handleBiochemicalFailureChange}
                />
              {dateOfBFWidget()}
              {metastasesWidget()}

              {metastasesSiteAndDateWidgets()}
            </div>
          </div>

          <div className={styles['fufu-top-middle-container']}>
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
            <TextInput
              label='SF-12 PCS'
              />
            <TextInput
              label='SF-12 MCS'
              />
            ("-1" = data missing / NA)
            <button>Get EPIC Scores</button>
            <button>Enter EPIC Data</button>
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
                />
            </div>
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
      </Panel>
    );
  };
};

FollowUpFollowUp.propTypes = {
  mainHeading: React.PropTypes.string,
};
