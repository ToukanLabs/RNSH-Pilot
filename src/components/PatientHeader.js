import React, {Component} from 'react';
import { FormattedDate } from 'react-intl';
import styles from './PatientHeader.scss';

export default class PatientHeader extends Component {
  render () {
    const patient = this.props.patient;
    const dob = (patient.dob) ? patient.dob : '1970-01-01';
    const title = (patient.gender === 'F') ? 'Mrs' : 'Mr';
    return (
      <div className={styles['ph-container']}>
        <div className={styles['ph-big-field']}>
          {`${patient.surname.toUpperCase()}, ${patient.firstname} (${title})`}
        </div>
        <div className={styles['ph-field']}>
          <label className={styles['ph-label']}>
            DOB:&nbsp;
            <span className={styles['ph-data']}>
              <FormattedDate
                value={Date.parse(dob)}
                format='short'
                />
            </span>
          </label>
        </div>
        <div className={styles['ph-field']}>
          <label className={styles['ph-label']}>
            Gender:&nbsp;
            <span className={styles['ph-data']}>
              {(patient.gender === 'M') ? 'Male' : 'Female'}
            </span>
          </label>
        </div>
        <div className={styles['ph-field']}>
          <label className={styles['ph-label']}>
            MRN:&nbsp;
            <span className={styles['ph-data']}>{patient.mrn}</span>
          </label>
        </div>
        <div className={styles['ph-field']}>
          <label className={styles['ph-label']}>
            Tumor Type:&nbsp;
            <span className={styles['ph-data']}>{patient.tumorType}</span>
          </label>
        </div>
      </div>
    );
  };
};

PatientHeader.propTypes = {
  patient: React.PropTypes.object
};
