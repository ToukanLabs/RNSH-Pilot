import React, { Component } from 'react';
import { connect } from 'react-redux';
import MultiGraph from 'components/MultiGraph';

const mapStateToProps = (state) => ({
  graphs: state.graphs
});

export default class PatientOverviewView extends Component {
  render () {
    return (
      <MultiGraph graphs={this.props.graphs} />
    );
  }
}

export default connect(mapStateToProps)(PatientOverviewView);

PatientOverviewView.propTypes = {
  graphs: React.PropTypes.array
};
