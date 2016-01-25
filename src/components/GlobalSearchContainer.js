import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as uiActions } from 'redux/modules/ui';

import GlobalSearch from 'components/GlobalSearch';
import GlobalSearchResults from 'components/GlobalSearchResults';
import styles from './GlobalSearchContainer.scss';

const mapStateToProps = (state) => ({
  searchResultsVisibility: state.ui.searchResultsVisibility,
  searchString: state.ui.searchString,
  patients: state.patients.searchResults,
  tumorFilter: state.ui.tumorFilter
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
        // this.hide();
        this.props.uiActions.hideSearchResults();
      }
    }
  };

  render () {
    return (
      <div className={styles['gs-input-wrapper']}>
        <GlobalSearch
          showSearchResults = { this.props.uiActions.showSearchResults }
          updateSearchString = {this.props.uiActions.updateSearchString}
        />
        <GlobalSearchResults
          searchResultsVisibility = {this.props.searchResultsVisibility}
          hideSearchResults = { this.props.uiActions.hideSearchResults }
          toggleTumorFilter = {this.props.uiActions.toggleTumorFilter}
          searchString = {this.props.searchString}
          patients = {this.props.patients}
          tumorFilter = {this.props.tumorFilter}
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
