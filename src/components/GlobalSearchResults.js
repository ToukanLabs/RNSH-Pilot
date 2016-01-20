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
    var key = this.props.searchString ? this.props.searchString.toUpperCase() : '';
    var name = value.name.toUpperCase();
    var mrn = value.mrn.toString();
    console.log('vag');
    return (this.props.tumorFilter === undefined || this.props.tumorFilter === '' || value.tumorType === this.props.tumorFilter) &&
      (name.indexOf(key) >= 0 || mrn.indexOf(key) >= 0);
  }

  sortPatients (a, b) {
    var key = this.props.searchString ? this.props.searchString.toUpperCase() : '';
    var x = a.name.toUpperCase();
    var y = b.name.toUpperCase();
    return x.indexOf(key) - y.indexOf(key);
  }

  render () {
    if (this.props.searchResultsVisibility === 'expanded') {
      var patientResults;
      if ((this.props.searchString === undefined || this.props.searchString === '') && !this.props.tumorFilter) {
        patientResults = this.props.patients;
      } else {
        patientResults = this.props.patients.filter(this.filterPatients);
        patientResults = patientResults.sort(this.sortPatients);
      }
      console.log(this.props.tumorFilter);
      var prostateFilterClass = this.props.tumorFilter === 'Prostate' ? 'gs-tumor-filter-selected' : '';
      var cnsFilterClass = this.props.tumorFilter === 'CNS' ? 'gs-tumor-filter-selected' : '';
      var breastFilterClass = this.props.tumorFilter === 'Breast' ? 'gs-tumor-filter-selected' : '';
      var patientList = () => {
        return patientResults.map((p) => {
          return (
            <Link to={`/patient/${p.id}`}>
              <li className={styles['gs-patient-search-result']} key={p.id}>
                <h2>
                  {p.name}
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
            </Link>
          );
        });
      };
      return (
        <div className={styles['gs-result-container']}>
          <div className={styles['gs-result-filters']}>
            <h2>QUICK FILTERS</h2>
            <h3>Tumor Type</h3>
            <ul>
              <li className={styles[prostateFilterClass]}>
                <a
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    e.preventDefault();
                    this.props.toggleTumorFilter('Prostate');
                  }}>Prostate</a>
              </li>
              <li className={styles[cnsFilterClass]}>
                <a
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.toggleTumorFilter('CNS');
                  }}>CNS</a>
              </li>
              <li className={styles[breastFilterClass]}>
                <a
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.toggleTumorFilter('Breast');
                  }}>Breast</a>
              </li>
            </ul>
          </div>
          <div className={styles['gs-results']}>
            <ul className={styles['gs-patient-search-results']}>
              {patientList()}
            </ul>
          </div>
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
  toggleTumorFilter: React.PropTypes.func.isRequired,
  patients: React.PropTypes.array,
  tumorFilter: React.PropTypes.string,
  styles: React.PropTypes.object
};
