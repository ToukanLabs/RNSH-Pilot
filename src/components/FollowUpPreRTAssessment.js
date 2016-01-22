import React, { Component } from 'react';
import Panel from './Panel';
import { Select, TextInput, InlineWidgetGroup } from './widgets';
import styles from './FollowUpPreRTAssessment.scss';

export default class PreRTAssessment extends Component {
  render () {
    return (
      <Panel title='Pre-RT Assessment'>
        <InlineWidgetGroup>
          <TextInput
            type='text'
            label='IPSS'
            className={styles['fuprts-ipss']}
            />
          +
          <TextInput
            type='text'
            className={styles['fuprts-ipss']}
            />
          <TextInput
            type='text'
            label='Nocturia'
            unitLabel='time(s)'
            className={styles['fuprts-nocturia-input']}
            labelClassName={styles['fuprts-nocturia']}
            />
          <Select
            label='Daytime Freq.'
            labelClassName={styles['fuprts-daytime-freq']}
            options={[
              {key: 'Hourly', value: 'Hourly'},
              {key: '2nd Hour', value: '2nd Hour'},
              {key: '3rd Hour', value: '3rd Hour'},
              {key: '4th Hour', value: '4th Hour'},
              {key: '> 4th Hour', value: '> 4th Hour'},
            ]}
            />
          <TextInput
            type='text'
            label='Bowel Freq.'
            unitLabel='time(s) / day'
            className={styles['fuprts-bowel-freq-input']}
            labelClassName={styles['fuprts-bowel-freq']}
            />
          <TextInput
            type='text'
            label='Incontinence'
            className={styles['fuprts-incontinence-input']}
            labelClassName={styles['fuprts-incontinence']}
            />
        </InlineWidgetGroup>


      </Panel>
    );
  };
};
