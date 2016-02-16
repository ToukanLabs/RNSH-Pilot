import React, { Component } from 'react';
import Panel from './Panel';
import { Select, DateTimeInput } from './widgets';
import styles from './FollowUpStatus.scss';

export default class FollowUpStatus extends Component {
  constructor () {
    super();
    this.state = {
      deceased: false,
    };
  }

  handleStatusChange = (e) => {
    const status = e.target.value;
    this.setState({
      deceased: (status === 'Deceased')
    });
  };

  render () {
    return (
      <Panel title='Status' className={styles['fus-panel']}>
        <Select
          ref='patientStatus'
          label='Current Status'
          options={[
            {key: 'Alive', value: 'Alive'},
            {key: 'Deceased', value: 'Deceased'},
          ]}
          onChange={this.handleStatusChange}
          />
        <DateTimeInput
          label='Date of Death'
          noTime
          disabled={!this.state.deceased}
          />
      </Panel>
    );
  };
};
