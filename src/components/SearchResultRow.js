import React, { Component } from 'react';
import { Link } from 'react-router';
import { FormattedDate } from 'react-intl';
import styles from './SearchResultRow.scss';

export default class SearchResultRow extends Component {

  render () {
    return (
      <Link to={`/patient/${this.props.patient.id}`}>
        <li className={styles['gs-patient-search-result']} key={this.props.patient.id}>
          <h2>
            {this.props.patient.firstname + ' ' + this.props.patient.surname}
            <span className={styles['sr-tumortype']}>({this.props.patient.tumorType})</span>
          </h2>
          <label htmlFor='patient-mrn' className={styles['sr-label']}>MRN: </label>
          <span id='patient-mrn' className={styles['sr-value']}>{this.props.patient.mrn}</span>
          <label htmlFor='patient-dob' className={styles['sr-label']}>DOB: </label>
          <span id='patient-dob' className={styles['sr-value']}>
            <FormattedDate
              value={Date.parse(this.props.patient.dob)}
              day='numeric'
              month='short'
              year='numeric'
              />
          </span>
          <label htmlFor='patient-gender' className={styles['sr-label']}>Gender: </label>
          <span id='patient-gender' className={styles['sr-value']}>{this.props.patient.gender}</span>
        </li>
      </Link>
    );
  };
};

SearchResultRow.propTypes = {
  patient: React.PropTypes.object.isRequired,
  styles: React.PropTypes.object
};
