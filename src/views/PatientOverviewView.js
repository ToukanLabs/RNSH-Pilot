import React, { Component } from 'react';
import { connect } from 'react-redux';
import MultiGraph from 'components/MultiGraph';

const mapStateToProps = (state) => ({
  graphs: state.graphs
});

export class PatientOverviewView extends Component {
  render () {
    return (
      <div>
        <MultiGraph graphs={this.props.graphs} />
      </div>

    );
  }
}

export default connect(mapStateToProps)(PatientOverviewView);

PatientOverviewView.propTypes = {
  graphs: React.PropTypes.array
};
