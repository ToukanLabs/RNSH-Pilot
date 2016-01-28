import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as uiActions } from 'redux/modules/ui';
import { actions as patientActions } from 'redux/modules/patient';
import { actions as advancedSearchActions } from 'redux/modules/advancedSearch';
import GlobalSearchFilters from 'components/GlobalSearchFilters';
import SearchResultRow from 'components/SearchResultRow';
import styles from './HomeView.scss';
// import MultiGraph from '../components/MultiGraph';
// import CreatePatient from '../components/CreatePatient';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  graphs: state.graphs,
  patients: state.patients.searchResults,
  tumorFilter: state.ui.tumorFilter,
  mrn: state.advancedSearch.mrn,
  firstname: state.advancedSearch.firstname,
  surname: state.advancedSearch.surname
});

const mapDispatchToProps = (dispatch) => {
  return {
    uiActions: bindActionCreators(uiActions, dispatch),
    patientActions: bindActionCreators(patientActions, dispatch),
    advancedSearchActions: bindActionCreators(advancedSearchActions, dispatch),
  };
};

export class HomeView extends React.Component {

  componentWillMount () {
    this.props.uiActions.hideSearchResults();
    this.props.advancedSearchActions.resetSearchFields();
  }

  filterPatients = (value) => {
    var searchMRN = this.props.mrn ? this.props.mrn.toUpperCase() : '';
    var searchFirstname = this.props.firstname ? this.props.firstname.toUpperCase() : '';
    var searchSurname = this.props.surname ? this.props.surname.toUpperCase() : '';
    var firstname = value.firstname.toUpperCase();
    var surname = value.surname.toUpperCase();
    var mrn = value.mrn.toString();
    return (
      (searchMRN === '' || mrn.indexOf(searchMRN) >= 0) &&
      (searchFirstname === '' || firstname.indexOf(searchFirstname) >= 0) &&
      (searchSurname === '' || surname.indexOf(searchSurname) >= 0) &&
      (this.props.tumorFilter === undefined || this.props.tumorFilter === '' || value.tumorType === this.props.tumorFilter)
    );
  };

  render () {
    var patientResults;
    if (this.props.mrn || this.props.firstname || this.props.surname || this.props.tumorFilter) {
      patientResults = this.props.patients.filter(this.filterPatients);
    } else {
      patientResults = this.props.patients;
    }

    var patientList = () => {
      return patientResults.map((p) => {
        return (
          <SearchResultRow key={p.id} patient={p}/>
        );
      });
    };
    return (
      <div className={styles['as-container']}>
        <div className={styles['as-search-container']}>
          <h2>Patient Search</h2>
          <div className={styles['as-s-field-container']}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.props.advancedSearchActions.setSearchFields(
                  this.refs.searchMRN.value,
                  this.refs.searchFirstname.value,
                  this.refs.searchSurname.value
                );
              }}>
              <label className={styles['as-label']}>MRN:</label>
              <input
                ref='searchMRN'
                className={styles['as-input']}
              />
              <label className={styles['as-label']}>First Name:</label>
                <input
                  ref='searchFirstname'
                  className={styles['as-input']}
                />
              <label className={styles['as-label']}>Surname:</label>
                <input
                  ref='searchSurname'
                  className={styles['as-input']}
                />
              <input
                type='submit'
                value='Search'
                />
            </form>
          </div>
        </div>
        <div className={styles['as-result-container']}>
          <h2>Search Results</h2>
          <GlobalSearchFilters
            className={styles['hv-search-filters']}
            toggleTumorFilter={this.props.uiActions.toggleTumorFilter}
            tumorFilter={this.props.tumorFilter}
            mainClass='hv-result-filters'
            selectedClass='gs-tumor-filter-selected'
          />
          <div className={styles['hv-results']}>
            <ul className={styles['hv-patient-search-results']}>
              {patientList()}
            </ul>
          </div>
        </div>
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

HomeView.propTypes = {
  createPatient: React.PropTypes.func,
  graphs: React.PropTypes.array,
  uiActions: React.PropTypes.object,
  advancedSearchActions: React.PropTypes.object,
  patients: React.PropTypes.array,
  mrn: React.PropTypes.string,
  firstname: React.PropTypes.string,
  surname: React.PropTypes.string,
  tumorFilter: React.PropTypes.string
};
