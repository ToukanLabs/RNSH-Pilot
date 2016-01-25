import React, {Component} from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  patients: state.patients
});

export class PatientOverview extends Component {

  render () {
    return (
      <div>
        <h2>Patient Overview</h2>
        <div>Fields to do ....</div>
      </div>
    );
  };
};

export default connect(mapStateToProps)(PatientOverview);
