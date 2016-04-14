import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Motion, spring, presets } from 'react-motion';
import PatientHeader from 'components/PatientHeader';
import PatientHeaderDetails from 'components/PatientHeaderDetails';
import Icon from './Icon';
import { actions as uiActions } from 'redux/modules/ui';
import styles from './PatientHeadContainer.scss';

const mapStateToProps = (state) => ({
  activePatient: state.patients.activePatient,
  patientHeaderVisibility: state.ui.patientHeaderVisibility,
});

const mapDispatchToProps = (dispatch) => {
  return {
    uiActions: bindActionCreators(uiActions, dispatch),
  };
};

export default class PatientHeadContainer extends Component {
  toggleVisibility = () => {
    if (this.props.patientHeaderVisibility === 'expanded') {
      this.props.uiActions.hidePatientHeader();
    } else {
      this.props.uiActions.showPatientHeader();
    }
  };

  render () {
    const patient = this.props.activePatient;

    const patientProfileImage = () => {
      let nameValue = (patient.firstname + patient.surname).split('').map(function (str) {
        return str.charCodeAt(0);
      }).reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
      });

      return '/img/profile_pictures/profile_' +
        (patient.gender === 'MALE' ? 'male_' : 'female_') +
        parseInt(((nameValue % 8) + 1), 10) + '.jpg';
    };

    var surgical = patient.surgical === 'Y' ? 'Surgical' : 'Non-Surgical';

    const allergiesHeaderData = () => {
      if (patient.allergies === null) {
        return 'Allergies not recorded';
      } else if (patient.allergies.length === 0) {
        return 'No known allergies';
      } else {
        const allergiesCount = patient.allergies.length;
        return (
          <span>{`Known allergies (${allergiesCount})`}</span>
        );
      }
    };

    const allergiesDetails = () => {
      if (patient.allergies === null) {
        return 'Allergies not recorded';
      } else if (patient.allergies.length === 0) {
        return 'No known allergies';
      } else {
        const allergiesList = patient.allergies.map((a) => {
          return (
            <li key={a.name}>{`${a.name}`}</li>
          );
        });
        return (
          <ul>
            {allergiesList}
          </ul>
        );
      }
    };

    const phoneEmailDetails = () => {
      return (
        <div className={styles.phcPhoneEmailDetails}>
          <label>
            Phone:
          </label>
          <span>{patient.phone}</span>
          <label>
            Email:
          </label>
          <span>{patient.email}</span>
        </div>
      );
    };

    const patientHeaderClassName =
        (this.props.patientHeaderVisibility === 'expanded')
        ? styles.phcExpanded
        : styles.phcCollapsed;

    const toggleIcon = () => {
      let className = styles.phcDetailDownIcon;
      let iconName;
      if (this.props.patientHeaderVisibility === 'expanded') {
        iconName = 'angle-double-up';
      } else {
        iconName = 'angle-double-down';
      }

      return (
        <div
          className={className}
          onClick={this.toggleVisibility}
          >
          <Icon
            name={iconName}
            />
        </div>
      );
    };

    const style = this.props.patientHeaderVisibility === 'expanded' ? {
      height: spring(100, presets.noWobble)
    } : {
      height: spring(20, presets.noWobble)
    };
    return (
      <div>
        <PatientHeader
            patient={patient}
            patientProfileImage={patientProfileImage()}
            showPatientProfileImage={this.props.patientHeaderVisibility === 'expanded' ? 'false' : 'true'}
          />
        <Motion style={style}>
          {({height}) =>
          <div className={patientHeaderClassName} style={{height: height}}>
            <PatientHeaderDetails
              phdType='image'
              phdDetails={patientProfileImage()}
              visibility={this.props.patientHeaderVisibility}
              />
            <PatientHeaderDetails
              phdLabel='Address'
              phdHeaderData={patient.address}
              phdDetails={patient.address}
              visibility={this.props.patientHeaderVisibility}
            />
            <PatientHeaderDetails
              phdLabel='Phone & Email'
              phdHeaderData={patient.phone}
              phdDetails={phoneEmailDetails()}
              visibility={this.props.patientHeaderVisibility}
            />
            <PatientHeaderDetails
              phdLabel='Status'
              phdHeaderData={surgical}
              phdDetails={surgical}
              visibility={this.props.patientHeaderVisibility}
            />
            <PatientHeaderDetails
              phdLabel='Allergies'
              phdHeaderData={allergiesHeaderData()}
              phdDetails={allergiesDetails()}
              visibility={this.props.patientHeaderVisibility}
              />
            {toggleIcon()}
          </div>
          }
        </Motion>
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientHeadContainer);

PatientHeadContainer.propTypes = {
  activePatient: React.PropTypes.object,
  uiActions: React.PropTypes.object,
  patientHeaderVisibility: React.PropTypes.string,
};
