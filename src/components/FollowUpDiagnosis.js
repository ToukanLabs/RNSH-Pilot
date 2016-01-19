import React, { Component } from 'react';
import Panel from './Panel';
import { DateTimeInput, Select, Input, InlineWidgetGroup } from './widgets';

export default class FollowUpDiagnosis extends Component {
  render () {
    return (
      <Panel title='Diagnosis'>
        <DateTimeInput label='Date of Dx' noTime mandatory />
        <InlineWidgetGroup>
          <Select
            label='Stage'
            options={[
              {key: 'T1b', value: 'T1b'},
            ]}
            />
          <Select
            options={[
              {key: 'N1', value: 'N1'},
            ]}
            />
          <Select
            options={[
              {key: 'M0', value: 'M0'},
            ]}
            />
        </InlineWidgetGroup>

        <InlineWidgetGroup>
          <Select
            label='GS'
            options={[
              {key: '1', value: '1'}
            ]}
            />
          +
          <Select
            options={[
              {key: '2', value: '2'}
            ]}
            />
          =
          <Input
            type='text' />
        </InlineWidgetGroup>

        <Input
          type='text'
          label='Cores Biopsied' />
        <Input
          type='text'
          label='Cores Involved' />
        <Select
          label='RadOnc'
          options={[
            {key: 'T. Eade', value: 'T. Eade'}
          ]}
          />
        <Select
          label='Referring Urologist'
          options={[
            {key: 'J. Vass', value: 'J. Vass'}
          ]}
          />
        <Input
          type='text'
          label='Referring LMO' />
      </Panel>
    );
  };
};
