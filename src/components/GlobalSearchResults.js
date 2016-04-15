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
      ? styles.gsResultContainer
      : styles.gsResultContainerCollapsed;

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
      height: spring(500, {stiffness: 300, damping: 26})
    } : {
      height: spring(0, {stiffness: 300, damping: 26})
    };
    return (
      <Motion style={style}>
        {({height}) =>
          <div className={resultContainerClassName} style={{height: height}}>
            <GlobalSearchFilters
              toggleTumorFilter={this.props.toggleTumorFilter}
              tumorFilter={this.props.tumorFilter}
              mainClass='gsResultFilters'
              selectedClass='gsTumorFilterSelected'
            />
          <div className={styles.gsResults}>
              <div className={styles.chromeWorkaround}>
                <ul className={styles.gsPatientSearchResults}>
                  {patientList()}
                </ul>
              </div>
            </div>
            <div className={styles.gsResultsFooter}>
              <Link
                className={styles.gsAdvancedSearch}
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
