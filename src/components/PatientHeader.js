import React, {Component} from 'react';
import { FormattedDate } from 'react-intl';
import { Motion, spring, presets } from 'react-motion';
import styles from './PatientHeader.scss';

export default class PatientHeader extends Component {
  render () {
    const profileImage = () => {
      if (this.props.showPatientProfileImage === 'true') {
        return (
          <div className={styles.phProfileImageContainer}>
            <img src={this.props.patientProfileImage} className={styles.phProfileImage} />
            <span className={styles.phProfileImageHelper}></span>
          </div>
        );
      } else {
        return <div></div>;
      }
    };

    const patient = this.props.patient;
    const dob = (patient.dob) ? patient.dob : '1970-01-01';
    const title = (patient.gender === 'FEMALE') ? 'Mrs' : 'Mr';

    const style = this.props.showPatientProfileImage === 'true' ? {
      width: spring(40, presets.noWobble)
    } : {
      width: spring(0, presets.noWobble)
    };

    return (
      <div className={styles.phContainer}>
        <div className={styles.phIdentifierContainer}>
          <Motion style={style}>
            {({width}) =>
            <div className={styles.phProfileImageShowHideContainer} style={{width: width}}>
              {profileImage()}
            </div>
            }
          </Motion>
          <div className={styles.phBigField}>
            {`${patient.surname.toUpperCase()}, ${patient.firstname} (${title})`}
          </div>
        </div>
        <div className={styles.phDetails}>
          <div className={styles.phField}>
            <label className={styles.phLabel}>
              Tumor Type:&nbsp;
              <span className={styles.phData}>{patient.tumorType}</span>
            </label>
          </div>
          <div className={styles.phField}>
            <label className={styles.phLabel}>
              MRN:&nbsp;
              <span className={styles.phData}>{patient.mrn}</span>
            </label>
          </div>
          <div className={styles.phField}>
            <label className={styles.phLabel}>
              Gender:&nbsp;
              <span className={styles.phData}>
                {(patient.gender === 'MALE') ? 'Male' : 'Female'}
              </span>
            </label>
          </div>
          <div className={styles.phField}>
            <label className={styles.phLabel}>
              DOB:&nbsp;
              <span className={styles.phData}>
                <FormattedDate
                  value={Date.parse(dob)}
                  format='short'
                  />
              </span>
            </label>
          </div>
        </div>
      </div>
    );
  };
};

PatientHeader.propTypes = {
  patient: React.PropTypes.object,
  patientProfileImage: React.PropTypes.string,
  showPatientProfileImage: React.PropTypes.string,
};
