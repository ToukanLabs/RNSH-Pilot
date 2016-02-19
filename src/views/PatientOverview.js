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
  activeFollowUp: state.patients.activePatient.activeFollowUp,
});

const mapDispatchToProps = (dispatch) => {
  return {
    patientActions: bindActionCreators(patientActions, dispatch),
  };
};

export class PatientOverview extends Component {
  componentWillMount () {
    this.props.patientActions.fetchFollowUpLatest();
  };

  render () {
    return (
      <div>
        <PatientOverviewDemographics />
        <PatientOverviewDiagnosis />
        <PatientOverviewTreatment />
        {
        <Panel title='Latest Follow Up'>
          <FollowUpFollowUp
            data={this.props.activeFollowUp}
            mrn={this.props.mrn}
            firstname={this.props.firstname}
            surname={this.props.surname}
            patientActions={this.props.patientActions}
            />
        </Panel>
        }
      </div>
    );
  };
};

PatientOverview.propTypes = {
  activeFollowUp: React.PropTypes.object,
  mrn: React.PropTypes.string,
  firstname: React.PropTypes.string,
  surname: React.PropTypes.string,
  patientActions: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientOverview);
