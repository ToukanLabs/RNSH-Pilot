import React, { Component } from 'react';
import { Link } from 'react-router';
import SearchResultRow from 'components/SearchResultRow';
import GlobalSearchFilters from 'components/GlobalSearchFilters';
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

      var patientList = () => {
        return patientResults.map((p) => {
          return (
            <SearchResultRow patient={p}/>
          );
        });
      };
      return (
        <div className={styles['gs-result-container']}>
          <GlobalSearchFilters
            toggleTumorFilter={this.props.toggleTumorFilter}
            tumorFilter={this.props.tumorFilter}
            mainClass='gs-result-filters'
            selectedClass='gs-tumor-filter-selected'
          />
          <div className={styles['gs-results']}>
            <ul className={styles['gs-patient-search-results']}>
              {patientList()}
            </ul>
          </div>
          <div className={styles['gs-results-footer']}>
            <Link
              className={styles['gs-advanced-search']}
              to={`/`}
            >Advanced Search</Link>
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
