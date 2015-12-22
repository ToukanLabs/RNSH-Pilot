import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { actions as graphActions } from '../redux/modules/graph';
// import styles from './HomeView.scss';
import MultiGraph from '../components/MultiGraph';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  graphs: state.graphs
});

export class HomeView extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='container text-center'>
        <Link to='/about'>Go To About View...</Link>
        <Link to='/patient/7'>Patients ...</Link>
        <br/>
        <MultiGraph graphs={this.props.graphs} />
      </div>
    );
  }
}

export default connect(mapStateToProps, graphActions)(HomeView);

HomeView.propTypes = {
  setGraphState: React.PropTypes.object,
  graphs: React.PropTypes.array
};
