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
        <div className={styles['fuv-container-table']}>
          <div className={styles['fuv-row-one']}>
            <div className={styles['fuv-diagnosis-container']}>
              <FollowUpDiagnosis />
            </div>
            <div className={styles['fuv-intent-status-container']}>
              <div className={styles['fuv-intent-container']}>
                <FollowUpIntent />
              </div>
              <div className={styles['fuv-status-container']}>
                <FollowUpStatus />
              </div>
            </div>
            <div className={styles['fuv-graph-container']}>
              <Panel>
                <MultiGraph
                  graphs={this.props.graphs}
                  patientId={this.props.activePatient.id}
                  handleDetailViewClick={this.handleDetailViewClick}
                />
              </Panel>
            </div>
          </div>
        </div>

        <div className={styles['fuv-row-two']}>
          <div className={styles['fuv-prertassess-container']}>
            <FollowUpPreRTAssessment />
          </div>
        </div>

        <div className={styles['fuv-row-three']}>
          <div className={styles['fuv-followup-container']}>
            <FollowUpTabs
              followUps={this.props.activePatient.followUps}
              activeFollowUp={this.props.activePatient.activeFollowUp}
              handleFollowUpOnClick={this.props.patientActions.followUpFetch}
              handleNewFollowUpOnClick={this.props.patientActions.followUpCreateNew}
              />
            <Panel title='Follow Up' className={styles['fuv-follow-up-panel']}>
              <FollowUpFollowUp
                data={this.props.activePatient.activeFollowUp}
                mrn={this.props.activePatient.mrn}
                firstname={this.props.activePatient.firstname}
                surname={this.props.activePatient.surname}
                patientActions={this.props.patientActions}
                enableFollowUpSave
              />
            </Panel>
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
