import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { actions as patientActions } from '../redux/modules/patient';
// import styles from './HomeView.scss';
import MultiGraph from '../components/MultiGraph';
// import CreatePatient from '../components/CreatePatient';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  graphs: state.graphs
});

export class HomeView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <Link to='/patient/7'>Patients ...</Link>
        {
          // <CreatePatient handleSave={this.props.createPatient} />
        }
        <br/>
        <MultiGraph graphs={this.props.graphs} />
      </div>
    );
  }
}

export default connect(mapStateToProps, patientActions)(HomeView);

HomeView.propTypes = {
  createPatient: React.PropTypes.func,
  graphs: React.PropTypes.array
};
