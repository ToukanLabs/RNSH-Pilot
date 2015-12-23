import React, {Component} from 'react';
import styles from './PatientHeader.scss';

export default class PatientHeader extends Component {
  render () {
    return (
      <div className={styles['ph-container']}>
        <div className={styles['ph-big-field']}>
          {this.props.patient.name}
        </div>
        <div className={styles['ph-field']}>
          <label className={styles['ph-label']}>
            DOB:&nbsp;
            <span className={styles['ph-data']}>{this.props.patient.dob}</span>
          </label>
        </div>
        <div className={styles['ph-field']}>
          <label className={styles['ph-label']}>
            Gender:&nbsp;
            <span className={styles['ph-data']}>{this.props.patient.gender}</span>
          </label>
        </div>
        <div className={styles['ph-field']}>
          <label className={styles['ph-label']}>
            MRN:&nbsp;
            <span className={styles['ph-data']}>{this.props.patient.mrn}</span>
          </label>
        </div>
      </div>
    );
  };
};

PatientHeader.propTypes = {
  patient: React.PropTypes.object
};
