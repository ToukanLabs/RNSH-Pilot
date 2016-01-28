import React from 'react';
import SideMenu from 'components/SideMenu';
import PatientHeadContainer from 'components/PatientHeadContainer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as uiActions } from 'redux/modules/ui';
import { actions as patientActions } from 'redux/modules/patient';
import styles from './PatientView.scss';

const mapStateToProps = (state) => ({
  routerPath: state.router.path,
  sidemenuVisibility: state.ui.sidemenuVisibility,
  patientHeaderVisibility: state.ui.patientHeaderVisibility,
  activePatient: state.patients.activePatient
});

const mapDispatchToProps = (dispatch) => {
  return {
    uiActions: bindActionCreators(uiActions, dispatch),
    patientActions: bindActionCreators(patientActions, dispatch),
  };
};

export default class PatientView extends React.Component {
  componentWillReceiveProps (newProps) {
    if (newProps.params.id !== this.props.params.id) {
      this.props.patientActions.fetchPatient(newProps.params.id);
      this.props.uiActions.hideSearchResults();
      if (this.props.patientHeaderVisibility === 'expanded') {
        this.props.uiActions.hidePatientHeader();
      }
    }
  };

  componentWillUnmount () {
    if (this.props.patientHeaderVisibility === 'expanded') {
      this.props.uiActions.hidePatientHeader();
    }
  };

  componentWillMount () {
    this.props.patientActions.fetchPatient(this.props.params.id);
  };

  render () {
    var getContentClass = () => {
      if (this.props.sidemenuVisibility === 'expanded') {
        return styles['pv-patient-content'] + ' ' + styles['pv-expanded'];
      } else {
        return styles['pv-patient-content'] + ' ' + styles['pv-collapsed'];
      }
    };

    if (this.props.activePatient === undefined) {
      return (
        <h2>Loading...</h2>
      );
    }

    return (
      <div>
        <PatientHeadContainer />
        <div className={styles['pv-content-wrapper']}>
          <SideMenu
            routerPath={this.props.routerPath}
            patientId={parseInt(this.props.params.id, 10)}
            hideSideMenu={this.props.uiActions.hideSideMenu}
            showSideMenu={this.props.uiActions.showSideMenu}
            sidemenuVisibility={this.props.sidemenuVisibility}
            />
          <div className={getContentClass()}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientView);

PatientView.propTypes = {
  routerPath: React.PropTypes.string,
  children: React.PropTypes.element,
  params: React.PropTypes.object,
  activePatient: React.PropTypes.object,
  sidemenuVisibility: React.PropTypes.string,
  patientHeaderVisibility: React.PropTypes.string,
  uiActions: React.PropTypes.object,
  patientActions: React.PropTypes.object,
};
