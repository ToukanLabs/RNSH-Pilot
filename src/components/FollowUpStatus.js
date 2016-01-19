import React, { Component } from 'react';
import Panel from './Panel';
import { Select, DateTimeInput } from './widgets';

export default class FollowUpStatus extends Component {
  render () {
    return (
      <Panel title='Status' >
        <Select
          label='Current Status'
          options={[
            {key: 'Alive', value: 'Alive'}
          ]}
          />
        <DateTimeInput
          label='Date of Death'
          noTime
          />
      </Panel>
    );
  };
};
