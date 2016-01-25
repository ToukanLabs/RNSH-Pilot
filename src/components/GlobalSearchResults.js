import React, { Component } from 'react';
import { Link } from 'react-router';
import SearchResultRow from 'components/SearchResultRow';
import GlobalSearchFilters from 'components/GlobalSearchFilters';
import styles from './GlobalSearchResults.scss';

export default class GlobalSearchResults extends Component {
  render () {
    if (this.props.searchResultsVisibility === 'expanded') {
      var patientList = () => {
        return this.props.results.map((p) => {
          return (
            <SearchResultRow key={p.id} patient={p}/>
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
            <div className={styles['chrome-workaround']}>
              <ul className={styles['gs-patient-search-results']}>
                {patientList()}
              </ul>
            </div>
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
  hideSearchResults: React.PropTypes.func.isRequired,
  toggleTumorFilter: React.PropTypes.func.isRequired,
  results: React.PropTypes.array,
  tumorFilter: React.PropTypes.string,
  styles: React.PropTypes.object,
};
