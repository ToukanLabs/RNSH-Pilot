import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as patientActions } from '../redux/modules/patient';
import PatientOverviewDemographics from 'components/PatientOverviewDemographics';
import PatientOverviewDiagnosis from 'components/PatientOverviewDiagnosis';
import PatientOverviewTreatment from 'components/PatientOverviewTreatment';
import FollowUpFollowUp from 'components/FollowUpFollowUp';
import Panel from 'components/Panel';

const mapStateToProps = (state) => ({
  activePatient: state.patients.activePatient,
});

const mapDispatchToProps = (dispatch) => {
  return {
    patientActions: bindActionCreators(patientActions, dispatch),
  };
};

export class PatientOverview extends Component {
  componentDidMount = () => {
    this.props.patientActions.followUpFetchList();
  };

  render () {
    return (
      <div>
        <PatientOverviewDemographics />
        <PatientOverviewDiagnosis />
        <PatientOverviewTreatment />
        {
        <Panel title='Latest Follow Up'>
          <FollowUpFollowUp data={this.props.activePatient.activeFollowUp} />
        </Panel>
        }
      </div>
    );
  };
};

PatientOverview.propTypes = {
  activePatient: React.PropTypes.object,
  patientActions: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientOverview);
