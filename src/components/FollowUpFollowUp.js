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
  render () {
    return (
      <Panel title='Follow Up'>
        <div className={styles['fufu-row-one']}>
          <div className={styles['fufu-top-left-container']}>
            <InlineWidgetGroup>
              <DateTimeInput
                label='FU Date'
                mandatory
                noTime
                />
              <Select
                label='Current hormones'
                options={[
                  {key: 'No', value: 'No'},
                  {key: 'Adjuvant', value: 'Adjuvant'},
                  {key: 'Relapse', value: 'Relapse'},
                  {key: 'UKN', value: 'UKN'},
                ]}
                />
            </InlineWidgetGroup>
            <InlineWidgetGroup>
              <TextInput
                label='Time from Prostate RT Finished'
                unitLabel='months'
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
            </InlineWidgetGroup>
            <InlineWidgetGroup>
              <TextInput
                label='Time from Last Course of RT'
                unitLabel='months'
                />
              <Select
                label='Alpha Blocker / Anticholinergic'
                options={[
                  {key: 'Yes', value: 'Yes'},
                  {key: 'No', value: 'No'},
                ]}
                />
              -
              <Select
                options={[
                  {key: '0', value: '0'},
                  {key: '1', value: '1'},
                  {key: '2', value: '2'},
                  {key: '3', value: '3'},
                ]}
                />
            </InlineWidgetGroup>
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
              <InlineWidgetGroup>
                <Select
                  label='Biochemical Failure'
                  options={[
                    {key: 'Yes', value: 'Yes'},
                    {key: 'No', value: 'No'},
                    {key: 'UKN', value: 'UKN'},
                  ]}
                  />
                <Select
                  label='Metastases'
                  options={[
                    {key: 'Yes', value: 'Yes'},
                    {key: 'No', value: 'No'},
                  ]}
                  />
              </InlineWidgetGroup>
              <DateTimeInput
                label='Date of BF'
                noTime
                />
              <Select
                label='Site'
                options={[]}
                />
              <DateTimeInput
                label='Date'
                noTime
                />
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
