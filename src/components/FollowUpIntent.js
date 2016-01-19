import React, { Component } from 'react';
import Panel from './Panel';
import { Select } from './widgets';

export default class FollowUpIntent extends Component {
  render () {
    return (
      <Panel title='Intent' >
        <Select
          options={[
            {key: 'Adjuvant', value: 'Adjuvant'},
            {key: 'Salvage', value: 'Salvage'},
            {key: 'Observation', value: 'Observation'},
            {key: 'Oligomets', value: 'Oligomets'},
            {key: 'Palliative', value: 'Palliative'},
            {key: 'Other', value: 'Other'},
          ]}
          />
      </Panel>
    );
  };
};
