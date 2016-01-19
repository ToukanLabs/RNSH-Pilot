import React, { Component } from 'react';
import Panel from './Panel';
import { Select, DateTimeInput } from './widgets';

export default class FollowUpStatus extends Component {
  constructor () {
    super();
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.state = {
      deceased: false
    };
  }

  handleStatusChange () {
    const status = this.refs.patientStatus.getValue();
    this.setState({
      deceased: (status === 'Deceased')
    });
  }

  render () {
    return (
      <Panel title='Status' >
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
          disabled={this.state.deceased}
          />
      </Panel>
    );
  };
};
