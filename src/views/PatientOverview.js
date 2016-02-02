import React, {Component} from 'react';
import { connect } from 'react-redux';
import PatientOverviewDemographics from 'components/PatientOverviewDemographics';
import PatientOverviewDiagnosis from 'components/PatientOverviewDiagnosis';
import PatientOverviewTreatment from 'components/PatientOverviewTreatment';
import FollowUpFollowUp from 'components/FollowUpFollowUp';

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
        <FollowUpFollowUp mainHeading='Latest Follow Up'/>
      </div>
    );
  };
};

export default connect(mapStateToProps)(PatientOverview);
