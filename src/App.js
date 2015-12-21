import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import MultiGraph from './components/MultiGraph';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      graphs: []
    };
  }


  componentDidMount() {
    var thisApp = this;
    fetch('static/data/graphdata.json')
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then(function(graphData) {
        thisApp.setState({
          graphs: graphData.graphData.graphs
        });
      });
  }

  render() {
    return (
      <div>
        <h1>RNSH Pilot</h1>
        <MultiGraph graphs={this.state.graphs} />
      </div>
    );
  }
}
