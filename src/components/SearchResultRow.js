import React, { Component } from 'react';
import { Link } from 'react-router';
import { FormattedDate } from 'react-intl';
import styles from './SearchResultRow.scss';

export default class SearchResultRow extends Component {

  render () {
    const patient = this.props.patient;
    const title = (patient.gender === 'F') ? 'Mrs' : 'Mr';
    return (
      <Link to={`/patient/${patient.id}`}>
        <li className={styles['gs-patient-search-result']} key={patient.id}>
          <h2>
            {`${patient.surname.toUpperCase()}, ${patient.firstname} (${title})`}
            <span className={styles['sr-tumortype']}>({patient.tumorType})</span>
          </h2>
          <label htmlFor='patient-mrn' className={styles['sr-label']}>MRN: </label>
          <span id='patient-mrn' className={styles['sr-value']}>{patient.mrn}</span>
          <label htmlFor='patient-dob' className={styles['sr-label']}>DOB: </label>
          <span id='patient-dob' className={styles['sr-value']}>
            <FormattedDate
              value={Date.parse(patient.dob)}
              day='numeric'
              month='short'
              year='numeric'
              />
          </span>
          <label htmlFor='patient-gender' className={styles['sr-label']}>Gender: </label>
          <span id='patient-gender' className={styles['sr-value']}>{patient.gender}</span>
        </li>
      </Link>
    );
  };
};

SearchResultRow.propTypes = {
  patient: React.PropTypes.object.isRequired,
  styles: React.PropTypes.object
};
