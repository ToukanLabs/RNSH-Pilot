import React, {Component} from 'react';
import { connect } from 'react-redux';
import PatientOverviewDemographics from 'components/PatientOverviewDemographics';
import PatientOverviewDiagnosis from 'components/PatientOverviewDiagnosis';
import PatientOverviewTreatment from 'components/PatientOverviewTreatment';
import FollowUpFollowUp from 'components/FollowUpFollowUp';
import Panel from 'components/Panel';

const mapStateToProps = (state) => ({
  activeFollowUp: state.patients.activePatient.activeFollowUp,
});

export class PatientOverview extends Component {
  render () {
    return (
      <div>
        <PatientOverviewDemographics />
        <PatientOverviewDiagnosis />
        <PatientOverviewTreatment />
        {
        <Panel title='Latest Follow Up'>
          <FollowUpFollowUp data={this.props.activeFollowUp} />
        </Panel>
        }
      </div>
    );
  };
};

PatientOverview.propTypes = {
  activeFollowUp: React.PropTypes.object,
};

export default connect(mapStateToProps)(PatientOverview);
