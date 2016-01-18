import React, {Component} from 'react';
import { FormattedDate } from 'react-intl';
import styles from './PatientHeader.scss';

export default class PatientHeader extends Component {
  render () {
    const dob = (this.props.patient.dob) ? this.props.patient.dob : '1970-01-01';

    return (
      <div className={styles['ph-container']}>
        <div className={styles['ph-big-field']}>
          {this.props.patient.name}
        </div>
        <div className={styles['ph-field']}>
          <label className={styles['ph-label']}>
            DOB:&nbsp;
            <span className={styles['ph-data']}>
              <FormattedDate
                value={Date.parse(dob)}
                day='numeric'
                month='long'
                year='numeric'
                />
            </span>
          </label>
        </div>
        <div className={styles['ph-field']}>
          <label className={styles['ph-label']}>
            Gender:&nbsp;
            <span className={styles['ph-data']}>
              {(this.props.patient.gender === 'M') ? 'Male' : 'Female'}
            </span>
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
