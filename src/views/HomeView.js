import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { actions as patientActions } from '../redux/modules/patient';
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
  patients: state.patients.searchResults
});

export class HomeView extends React.Component {
  render () {
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

export default connect(mapStateToProps, patientActions)(HomeView);

HomeView.propTypes = {
  createPatient: React.PropTypes.func,
  graphs: React.PropTypes.array,
  patients: React.PropTypes.array
};
