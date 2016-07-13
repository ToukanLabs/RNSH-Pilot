import React, { Component } from 'react';
import styles from './GlobalSearchFilters.scss';

export default class GlobalSearchFilters extends Component {

  render () {
    var prostateFilterClass = this.props.tumorFilter === 'Prostate' ? this.props.selectedClass : '';
    var cnsFilterClass = this.props.tumorFilter === 'CNS' ? this.props.selectedClass : '';
    var breastFilterClass = this.props.tumorFilter === 'Breast' ? this.props.selectedClass : '';
    var allFilterClass = !this.props.tumorFilter ? this.props.selectedClass : '';
    return (
      <div className={this.props.mainClass}>
        <h2>QUICK FILTERS</h2>
        <h3>Tumor Type</h3>
        <ul>
          <li className={styles[allFilterClass]}>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                this.props.toggleTumorFilter('');
              }}>All</a>
          </li>
          <li className={styles[prostateFilterClass]}>
            <a
              href='#'
              onClick={(e) => {
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
  mainClass: React.PropTypes.string,
  selectedClass: React.PropTypes.string,
  styles: React.PropTypes.object
};
