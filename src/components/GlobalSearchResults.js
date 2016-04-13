import React, { Component } from 'react';
import { Link } from 'react-router';
import { Motion, spring } from 'react-motion';
import SearchResultRow from 'components/SearchResultRow';
import GlobalSearchFilters from 'components/GlobalSearchFilters';
import styles from './GlobalSearchResults.scss';

export default class GlobalSearchResults extends Component {
  render () {
    const resultContainerClassName =
      (this.props.searchResultsVisibility === 'expanded')
      ? styles['gs-result-container']
      : styles['gs-result-container-collapsed'];

    let patientList = () => {
      if (this.props.searchResultsVisibility === 'expanded') {
        return this.props.results.map((p) => {
          return (
            <SearchResultRow key={p.id} patient={p}/>
          );
        });
      } else {
        return null;
      }
    };

    const style = this.props.searchResultsVisibility === 'expanded' ? {
      height: spring(500, {stiffness: 190, damping: 26})
    } : {
      height: spring(0, {stiffness: 190, damping: 26})
    };
    return (
      <Motion style={style}>
        {({height}) =>
          <div className={resultContainerClassName} style={{height: height}}>
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
        }
      </Motion>
    );
  };
};

GlobalSearchResults.propTypes = {
  searchResultsVisibility: React.PropTypes.string,
  toggleTumorFilter: React.PropTypes.func.isRequired,
  results: React.PropTypes.array,
  tumorFilter: React.PropTypes.string,
  styles: React.PropTypes.object,
};
