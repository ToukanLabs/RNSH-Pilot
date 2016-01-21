import React, { Component } from 'react';
import styles from './GlobalSearchFilters.scss';

export default class GlobalSearchFilters extends Component {

  render () {
    var prostateFilterClass = this.props.tumorFilter === 'Prostate' ? 'gs-tumor-filter-selected' : '';
    var cnsFilterClass = this.props.tumorFilter === 'CNS' ? 'gs-tumor-filter-selected' : '';
    var breastFilterClass = this.props.tumorFilter === 'Breast' ? 'gs-tumor-filter-selected' : '';
    var allFilterClass = !this.props.tumorFilter ? 'gs-tumor-filter-selected' : '';
    return (
      <div className={styles['gs-result-filters']}>
        <h2>QUICK FILTERS</h2>
        <h3>Tumor Type</h3>
        <ul>
          <li className={styles[allFilterClass]}>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                e.preventDefault();
                this.props.toggleTumorFilter('');
              }}>All</a>
          </li>
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
    );
  };
};

GlobalSearchFilters.propTypes = {
  toggleTumorFilter: React.PropTypes.func.isRequired,
  tumorFilter: React.PropTypes.string,
  styles: React.PropTypes.object
};
