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

        </div>
        <GlobalSearchFilters
          toggleTumorFilter={this.props.uiActions.toggleTumorFilter}
          tumorFilter={this.props.tumorFilter}
        />
        <div className={styles['gs-results']}>
          <ul className={styles['gs-patient-search-results']}>
            {patientList()}
          </ul>
        </div>
      </div>
    );
  };

  renderOLDONE () {
    var patientList = () => {
      return this.props.patients.map((p) => {
        return (
          <li className={styles['hv-patient-search-result']} key={p.id}>
            <h2>
              <Link to={`/patient/${p.id}`}>{p.name}</Link>
              <span className={styles['hv-gender']}>({p.gender})</span>
            </h2>
            <label htmlFor='patient-dob' className={styles['hv-label']}>DOB: </label>
            <span id='patient-dob' className={styles['hv-value']}>{p.dob}</span>
            <label htmlFor='patient-mrn' className={styles['hv-label']}>MRN: </label>
            <span id='patient-mrn' className={styles['hv-value']}>{p.mrn}</span>
            <span className={styles['hv-tumortype']}>{p.tumorType}</span>
          </li>
        );
      });
    };

    return (
      <div className='container text-center'>
        <div className={styles['hv-patient-list']}>
          <h1>Patients</h1>
          <ul className={styles['hv-patient-search-results']}>
            {patientList()}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

HomeView.propTypes = {
  createPatient: React.PropTypes.func,
  graphs: React.PropTypes.array,
  uiActions: React.PropTypes.object,
  patients: React.PropTypes.array,
  tumorFilter: React.PropTypes.string
};
