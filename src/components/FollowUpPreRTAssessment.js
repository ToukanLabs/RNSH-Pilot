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
            label='Nocturis'
            unitLabel='time(s)' />
        </InlineWidgetGroup>

        <Select
          label='Daytime Freq.'
          options={[]}
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
