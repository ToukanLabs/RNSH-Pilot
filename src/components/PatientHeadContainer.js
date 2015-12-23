import React, {Component} from 'react';
import PatientHeader from 'components/PatientHeader';

export default class PatientHeadContainer extends Component {
  render () {
    return (
      <div>
        <PatientHeader patient={this.props.patient}/>
      </div>
    );
  };
};

PatientHeadContainer.propTypes = {
  patient: React.PropTypes.object
};
