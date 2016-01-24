import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as uiActions } from 'redux/modules/ui';
import { actions as patientActions } from 'redux/modules/patient';

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
