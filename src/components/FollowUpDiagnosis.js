import React, { Component } from 'react';
// import { findDOMNode } from 'react-dom';
import Panel from './Panel';
import { DateTimeInput, Select, Input, InlineWidgetGroup } from './widgets';

export default class FollowUpDiagnosis extends Component {
  constructor () {
    super();
    this.calculateGliesonScore = this.calculateGliesonScore.bind(this);
  }

  calculateGliesonScore () {
    const gsPattern1Val = parseInt(this.refs.gsPatternOne.getValue(), 10);
    const gsPattern2Val = parseInt(this.refs.gsPatternTwo.getValue(), 10);

    // Explicit use of undefined below as 0 tests as false which is an allowed
    // value.
    if (!isNaN(parseInt(gsPattern1Val, 10)) && !isNaN(parseInt(gsPattern2Val, 10))) {
      this.refs.gsCalculated.setValue(parseInt(gsPattern1Val, 10) + parseInt(gsPattern2Val, 10));
    } else {
      this.refs.gsCalculated.setValue('');
    }
  }

  render () {
    return (
      <Panel title='Diagnosis'>
        <DateTimeInput label='Date of Dx' noTime mandatory />
        <InlineWidgetGroup>
          <Select
            label='TNM'
            options={[
              {key: 'pT2', value: 'pT2'},
              {key: 'pT3a', value: 'pT3a'},
              {key: 'pT3b', value: 'pT3b'},
              {key: 'pT4', value: 'pT4'},
              {key: 'pTx', value: 'pTx'},
            ]}
            />
          <Select
            options={[
              {key: 'pN0', value: 'pN0'},
              {key: 'pN1', value: 'pN1'},
              {key: 'pN2', value: 'pN2'},
              {key: 'pNX', value: 'pNX'},
            ]}
            />
          <Select
            options={[
              {key: 'MX', value: 'MX'},
              {key: 'M0', value: 'M0'},
              {key: 'M1', value: 'M1'},
              {key: 'M1a', value: 'M1a'},
              {key: 'M1b', value: 'M1b'},
              {key: 'M1c', value: 'M1c'},
            ]}
            />
        </InlineWidgetGroup>

        <InlineWidgetGroup>
          <Select
            ref='gsPatternOne'
            label='GS'
            options={[
              {key: '0', value: '0'},
              {key: '1', value: '1'},
              {key: '2', value: '2'},
              {key: '3', value: '3'},
              {key: '4', value: '4'},
              {key: '5', value: '5'},
            ]}
            onChange={this.calculateGliesonScore}
            />
          +
          <Select
            ref='gsPatternTwo'
            options={[
              {key: '0', value: '0'},
              {key: '1', value: '1'},
              {key: '2', value: '2'},
              {key: '3', value: '3'},
              {key: '4', value: '4'},
              {key: '5', value: '5'},
            ]}
            onChange={this.calculateGliesonScore}
            />
          =
          <Input
            ref='gsCalculated'
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
            {key: 'M. Back', value: 'M. Back'},
            {key: 'J. Donovan', value: 'J. Donovan'},
            {key: 'T. Eade', value: 'T. Eade'},
            {key: 'M. Holecek', value: 'M. Holecek'},
            {key: 'A. Kneebone', value: 'A. Kneebone'},
            {key: 'G. Lamoury', value: 'G. Lamoury'},
            {key: 'G. Morgan', value: 'G. Morgan'},
            {key: 'T. Shakespeare', value: 'T. Shakespeare'},
          ]}
          />
        <Select
          label='Referring Urologist'
          options={[
            {key: 'V. Chalasani', value: 'V. Chalasani'},
            {key: 'E. Lazzaro', value: 'E. Lazzaro'},
            {key: 'K. Rasiah', value: 'K. Rasiah'},
            {key: 'J. Vass', value: 'J. Vass'},
            {key: 'K. Vaux', value: 'K. Vaux'},
            {key: 'M. Wines', value: 'M. Wines'},
          ]}
          />
        <Input
          type='text'
          label='Referring LMO' />
      </Panel>
    );
  };
};
