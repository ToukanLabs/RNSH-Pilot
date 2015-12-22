import React, { Component } from 'react';
import GlobalSearch from 'components/GlobalSearch';

export default class GlobalHeader extends Component {
  render () {
    return <div>
      <h1>Hello Patient World!</h1>
      <GlobalSearch icon='search' placeholder='Global Search'/>
    </div>;
  };
};
