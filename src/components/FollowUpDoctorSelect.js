import React, { Component } from 'react';
import { Select } from './widgets';

export default class FollowUpDoctorSelect extends Component {
  render () {
    return (
      <Select
        label={this.props.label}
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
    );
  };
};

FollowUpDoctorSelect.propTypes = {
  label: React.PropTypes.string,
};
