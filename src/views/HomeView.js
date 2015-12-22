import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { actions as counterActions } from '../redux/modules/counter';
import styles from './HomeView.scss';
import MultiGraph from '../components/MultiGraph';

const graphs = [
  {
    'name': 'psa',
    'displayName': 'PSA',
    'type': 'line',
    'yAxisLabel': 'ng / mL',
    'data': [
      { 'date': '29-Nov-06', 'data': 2.37 },
      { 'date': '09-Nov-10', 'data': 4.42 },
      { 'date': '21-Jan-11', 'data': 5.18 },
      { 'date': '21-Feb-12', 'data': 11 },
      { 'date': '01-Jul-12', 'data': 1.6 },
      { 'date': '09-Sep-13', 'data': 0.1 },
      { 'date': '23-Feb-15', 'data': 0.1 }
    ]
  },
  {
    'name': 'testosterone',
    'displayName': 'Testosterone',
    'type': 'line',
    'yAxisLabel': 'nmol / L',
    'data': [
      { 'date': '29-Nov-06', 'data': 6.4 },
      { 'date': '09-Nov-10', 'data': 3.0 },
      { 'date': '21-Jan-11', 'data': 1.2 },
      { 'date': '21-Feb-12', 'data': 2.4 },
      { 'date': '01-Jul-12', 'data': 4.8 },
      { 'date': '09-Sep-13', 'data': 5.5 },
      { 'date': '23-Feb-15', 'data': 6.3 }
    ]
  },
  {
    'name': 'androgen',
    'displayName': 'Androgen',
    'type': 'timeline',
    'data': [
      { 'start': '24-Jul-12', 'end': '24-Jan-13' }
    ]
  },
  {
    'name': 'radiotherapy',
    'displayName': 'Radiotherapy',
    'type': 'timeline',
    'data': [
      { 'start': '04-Sep-12', 'end': '23-Nov-12' }
    ]
  },
  {
    'name': 'surgery',
    'displayName': 'Surgery',
    'type': 'point',
    'data': [
      { 'date': '14-May-12', 'hoverTitle': 'Prostatectomy' }
    ]
  }
];

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter
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
        <h1>Welcome to the React Redux Starter Kit</h1>
        <h2>
          Sample Counter:&nbsp;
          <span className={styles['counter--green']}>{this.props.counter}</span>
        </h2>
        <button className='btn btn-default'
                onClick={() => this.props.increment(1)}>
          Increment
        </button>
        <button className='btn btn-default'
                onClick={this.props.doubleAsync}>
          Double (Async)
        </button>
        <hr />
        <Link to='/about'>Go To About View...</Link>
        <Link to='/patient/7'>Patients ...</Link>
        <br/>
        <MultiGraph graphs={graphs} />
      </div>
    );
  }
}

export default connect(mapStateToProps, counterActions)(HomeView);
