import React, { Component } from 'react';
import Panel from './Panel';
import { Select } from './widgets';

export default class FollowUpIntent extends Component {
  render () {
    return (
      <Panel title='Intent' >
        <Select
          options={[
            {key: 'Prostate SBRT', value: 'Prostate SBRT'}
          ]}
          />
      </Panel>
    );
  };
};
