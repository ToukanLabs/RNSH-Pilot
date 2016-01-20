import React, { Component } from 'react';
import Panel from './Panel';
import { Select, Input, InlineWidgetGroup } from './widgets';

export default class PreRTAssessment extends Component {
  render () {
    return (
      <Panel title='Pre-RT Assessment' >
        <InlineWidgetGroup>
          <Input
            type='text'
            label='IPSS' />
          +
          <Input
            type='text' />
          <Input
            type='text'
            label='Nocturia'
            unitLabel='time(s)' />
        </InlineWidgetGroup>

        <Select
          label='Daytime Freq.'
          options={[
            {key: 'Hourly', value: 'Hourly'},
            {key: '2nd Hour', value: '2nd Hour'},
            {key: '3rd Hour', value: '3rd Hour'},
            {key: '4th Hour', value: '4th Hour'},
            {key: '> 4th Hour', value: '> 4th Hour'},
          ]}
          />
        <Input
          type='text'
          label='Bowel Freq.'
          unitLabel='time(s) / day' />
        <Input
          type='text'
          label='Incontinence' />
      </Panel>
    );
  };
};
