import React, {Component} from 'react';
import { connect } from 'react-redux';
import PatientOverviewDemographics from 'components/PatientOverviewDemographics';
import PatientOverviewDiagnosis from 'components/PatientOverviewDiagnosis';
import PatientOverviewTreatment from 'components/PatientOverviewTreatment';

const mapStateToProps = (state) => ({
  patients: state.patients
});

export class PatientOverview extends Component {

  render () {
    return (
      <div>
        <PatientOverviewDemographics/>
        <PatientOverviewDiagnosis/>
        <PatientOverviewTreatment/>
      </div>
    );
  };
};

export default connect(mapStateToProps)(PatientOverview);
