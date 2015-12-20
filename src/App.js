import React, { Component } from 'react';
import MultiGraph from './components/MultiGraph';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>RNSH Pilot</h1>
        <MultiGraph />
      </div>
    );
  }
}
