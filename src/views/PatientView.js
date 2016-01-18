import React from 'react';
import SideMenu from 'components/SideMenu';
import PatientHeadContainer from 'components/PatientHeadContainer';
import { connect } from 'react-redux';
import { actions as uiActions } from 'redux/modules/ui';
import { actions as patientActions } from 'redux/modules/patient';
import styles from './PatientView.scss';

const mapStateToProps = (state) => ({
  routerPath: state.router.path,
  sidemenuVisibility: state.ui.sidemenuVisibility,
  activePatient: state.patients.activePatient
});

export default class PatientView extends React.Component {
  componentWillMount () {
    this.props.fetchPatient(this.props.params.id);
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
        <PatientHeadContainer patient={this.props.activePatient}/>
        <div className={styles['pv-content-wrapper']}>
          <SideMenu
            routerPath={this.props.routerPath}
            patientId={parseInt(this.props.params.id, 10)}
            hideSideMenu={this.props.hideSideMenu}
            showSideMenu={this.props.showSideMenu}
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

export default connect(mapStateToProps, {...uiActions, ...patientActions})(PatientView);

PatientView.propTypes = {
  routerPath: React.PropTypes.string,
  children: React.PropTypes.element,
  params: React.PropTypes.object,
  activePatient: React.PropTypes.object,
  hideSideMenu: React.PropTypes.func,
  showSideMenu: React.PropTypes.func,
  sidemenuVisibility: React.PropTypes.string,
  fetchPatient: React.PropTypes.func
};
