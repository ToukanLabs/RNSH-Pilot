import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as uiActions } from 'redux/modules/ui';
import { browserHistory } from 'react-router';
import GlobalSearch from 'components/GlobalSearch';
import GlobalSearchResults from 'components/GlobalSearchResults';
import styles from './GlobalSearchContainer.scss';

const mapStateToProps = (state) => ({
  searchResultsVisibility: state.ui.searchResultsVisibility,
  searchString: state.ui.searchString,
  patients: state.patients.searchResults,
  tumorFilter: state.ui.tumorFilter,
});

const mapDispatchToProps = (dispatch) => {
  return {
    uiActions: bindActionCreators(uiActions, dispatch),
  };
};

export default class GlobalSearchContainer extends Component {
  constructor () {
    super();
    this._onWindowClick = this._onWindowClick.bind(this);
  };

  componentDidMount () {
    window.addEventListener('click', this._onWindowClick);
  };

  componentWillUnmount () {
    window.removeEventListener('click', this._onWindowClick);
  };

  _onWindowClick () {
    if (this.props.searchResultsVisibility === 'expanded') {
      const dropdown_element = findDOMNode(this);
      if (event.target !== dropdown_element && !dropdown_element.contains(event.target)) {
        this.props.uiActions.hideSearchResults();
      }
    }
  };

  handleSearchOnChange = (e) => {
    const searchString = e.target.value;
    this.props.uiActions.updateSearchString(searchString);
    if (this.props.searchResultsVisibility === 'collapsed') {
      this.props.uiActions.showSearchResults();
    }
  };

  handleSearchOnKeyUp = (e) => {
    if (e.keyCode === 13) {
      const results = this.getSearchResults();
      if (results.length === 1) {
        const patientId = results[0].id;
        browserHistory.push(`/patient/${patientId}`);
      }
    } else if (e.keyCode === 27) {
      this.props.uiActions.hideSearchResults();
    }
  };

  filterPatients = (value) => {
    var key = this.props.searchString ? this.props.searchString.toUpperCase() : '';
    var name = value.firstname.toUpperCase() + ' ' + value.surname.toUpperCase();
    var mrn = value.mrn.toString();
    return (this.props.tumorFilter === undefined || this.props.tumorFilter === '' || value.tumorType === this.props.tumorFilter) &&
      (name.indexOf(key) >= 0 || mrn.indexOf(key) >= 0);
  };

  sortPatients = (a, b) => {
    var key = this.props.searchString ? this.props.searchString.toUpperCase() : '';
    var x = a.firstname.toUpperCase() + ' ' + a.surname.toUpperCase();
    var y = b.firstname.toUpperCase() + ' ' + b.surname.toUpperCase();
    return x.indexOf(key) - y.indexOf(key);
  };

  getSearchResults = () => {
    var patientResults;
    if ((this.props.searchString === undefined || this.props.searchString === '') && !this.props.tumorFilter) {
      patientResults = this.props.patients;
    } else {
      patientResults = this.props.patients.filter(this.filterPatients);
      patientResults = patientResults.sort(this.sortPatients);
    }
    return patientResults;
  };

  render () {
    return (
      <div className={styles['gs-input-wrapper']}>
        <GlobalSearch
          onFocus={this.props.uiActions.showSearchResults}
          onChange={this.handleSearchOnChange}
          onKeyUp={this.handleSearchOnKeyUp}
        />
        <GlobalSearchResults
          searchResultsVisibility={this.props.searchResultsVisibility}
          hideSearchResults={this.props.uiActions.hideSearchResults}
          toggleTumorFilter={this.props.uiActions.toggleTumorFilter}
          tumorFilter={this.props.tumorFilter}
          results={this.getSearchResults()}
        />
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalSearchContainer);

GlobalSearchContainer.propTypes = {
  placeholder: React.PropTypes.string,
  searchResultsVisibility: React.PropTypes.string,
  uiActions: React.PropTypes.object,
  searchString: React.PropTypes.string,
  patients: React.PropTypes.array,
  tumorFilter: React.PropTypes.string,
  styles: React.PropTypes.object
};
