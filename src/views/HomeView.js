import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { actions as uiActions } from 'redux/modules/ui';
import { actions as patientActions } from 'redux/modules/patient';
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
  tumorFilter: state.ui.tumorFilter
});

const mapDispatchToProps = (dispatch) => {
  return {
    uiActions: bindActionCreators(uiActions, dispatch),
    patientActions: bindActionCreators(patientActions, dispatch),
  };
};

export class HomeView extends React.Component {

  componentWillMount () {
    this.props.uiActions.hideSearchResults();
  }

  render () {
    var patientResults;
  //  if ((this.props.searchString === undefined || this.props.searchString === '') && !this.props.tumorFilter) {
    patientResults = this.props.patients;
  /*  } else {
      patientResults = this.props.patients.filter(this.filterPatients);
      patientResults = patientResults.sort(this.sortPatients);
    }
*/
    var patientList = () => {
      return patientResults.map((p) => {
        return (
          <SearchResultRow patient={p}/>
        );
      });
    };
    return (
      <div className={styles['as-container']}>
        <div className={styles['as-search-container']}>
          <h2>Patient Search</h2>
          <div className={styles['as-s-field-container']}>
            <label>MRN:</label>
            <input/>
            <label>First Name:</label>
            <input/>
            <label>Surname:</label>
            <input/>
            <button>Search</button>
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
  patients: React.PropTypes.array,
  tumorFilter: React.PropTypes.string
};
