import React, { Component } from 'react';
import { Link } from 'react-router';
import { FormattedDate } from 'react-intl';
import styles from './GlobalSearchResults.scss';

export default class GlobalSearchResults extends Component {
  constructor () {
    super();
    this.filterPatients = this.filterPatients.bind(this);
    this.sortPatients = this.sortPatients.bind(this);
  };

  filterPatients (value) {
    var key = this.props.searchString.toUpperCase();
    var name = value.name.toUpperCase();
    var mrn = value.mrn.toString();
    return name.indexOf(key) >= 0 || mrn.indexOf(key) >= 0;
  }

  sortPatients (a, b) {
    var key = this.props.searchString.toUpperCase();
    var x = a.name.toUpperCase();
    var y = b.name.toUpperCase();
    return x.indexOf(key) - y.indexOf(key);
  }

  render () {
    if (this.props.searchResultsVisibility === 'expanded') {
      var patientResults;
      if (this.props.searchString === undefined || this.props.searchString === '') {
        patientResults = this.props.patients;
      } else {
        patientResults = this.props.patients.filter(this.filterPatients);
        patientResults = patientResults.sort(this.sortPatients);
      }
      var patientList = () => {
        return patientResults.map((p) => {
          return (
            <li className={styles['gs-patient-search-result']} key={p.id}>
              <h2>
                <Link to={`/patient/${p.id}`}>{p.name}</Link>
                <span className={styles['gs-tumortype']}>({p.tumorType})</span>
              </h2>
              <label htmlFor='patient-mrn' className={styles['gs-label']}>MRN: </label>
              <span id='patient-mrn' className={styles['gs-value']}>{p.mrn}</span>
              <label htmlFor='patient-dob' className={styles['gs-label']}>DOB: </label>
              <span id='patient-dob' className={styles['gs-value']}>
                <FormattedDate
                  value={Date.parse(p.dob)}
                  day='numeric'
                  month='short'
                  year='numeric'
                  />
              </span>
              <label htmlFor='patient-gender' className={styles['gs-label']}>Gender: </label>
              <span id='patient-gender' className={styles['gs-value']}>{p.gender}</span>
            </li>
          );
        });
      };
      return (
        <div className={styles['gs-result-container']}>
          <div></div>
          <ul className={styles['gs-patient-search-results']}>
            {patientList()}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  };
};

GlobalSearchResults.propTypes = {
  searchResultsVisibility: React.PropTypes.string,
  searchString: React.PropTypes.string,
  hideSearchResults: React.PropTypes.func.isRequired,
  patients: React.PropTypes.array,
  styles: React.PropTypes.object
};
