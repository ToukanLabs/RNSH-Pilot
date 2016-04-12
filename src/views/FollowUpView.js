import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as patientActions } from '../redux/modules/patient';
import FollowUpDiagnosis from 'components/FollowUpDiagnosis';
import FollowUpIntent from 'components/FollowUpIntent';
import FollowUpPreRTAssessment from 'components/FollowUpPreRTAssessment';
import FollowUpStatus from 'components/FollowUpStatus';
import FollowUpFollowUp from 'components/FollowUpFollowUp';
import FollowUpTabs from 'components/FollowUpTabs';
import Panel from 'components/Panel';
import MultiGraph from 'components/MultiGraph';
import styles from './FollowUpView.scss';

const mapStateToProps = (state) => ({
  graphs: state.graphs,
  activePatient: state.patients.activePatient
});

const mapDispatchToProps = (dispatch) => {
  return {
    patientActions: bindActionCreators(patientActions, dispatch),
  };
};

export class FollowUpView extends Component {

  handleDetailViewClick = (id) => {
    this.props.patientActions.setRTDetailViewId(id);
  };

  render () {
    return (
      <div>
        <div className={styles.fuvContainerTable}>
          <div className={styles.fuvRowOne}>
            <div className={styles.fuvDiagnosisContainer}>
              <FollowUpDiagnosis/>
            </div>
            <div className={styles.fuvIntentStatusContainer}>
              <div className={styles.fuvIntentContainer}>
                <FollowUpIntent />
              </div>
              <div className={styles.fuvStatusContainer}>
                <FollowUpStatus />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.fuvRowTwo}>
          <div className={styles.fuvGraphContainer}>
            <Panel>
              <MultiGraph
                graphs={this.props.graphs}
                patientId={this.props.activePatient.id}
                handleDetailViewClick={this.handleDetailViewClick}
              />
            </Panel>
          </div>

          <div className={styles.fuvPrertassessContainer}>
            <FollowUpPreRTAssessment />
          </div>
        </div>

        <div className={styles.fuvRowThree}>
          <div className={styles.fuvFollowupContainer}>
            <FollowUpTabs
              followUps={this.props.activePatient.followUps}
              activeFollowUp={this.props.activePatient.activeFollowUp}
              handleFollowUpOnClick={this.props.patientActions.followUpFetch}
              handleNewFollowUpOnClick={this.props.patientActions.followUpCreateNew}
              />
            <FollowUpFollowUp
              data={this.props.activePatient.activeFollowUp}
              mrn={this.props.activePatient.mrn}
              panelTitle={'Follow Up'}
              className={styles.fuvFollowUpPanel}
              firstname={this.props.activePatient.firstname}
              surname={this.props.activePatient.surname}
              patientActions={this.props.patientActions}
              enableFollowUpSave
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowUpView);

FollowUpView.propTypes = {
  graphs: React.PropTypes.array,
  activePatient: React.PropTypes.object,
  setRTDetailViewId: React.PropTypes.func,
  patientActions: React.PropTypes.object,
};
