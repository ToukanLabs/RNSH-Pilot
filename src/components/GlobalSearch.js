import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class GlobalSearch extends Component {
  render () {
    return <div>
    <FontAwesome name={this.props.icon}/><input placeholder={this.props.placeholder}/>
    </div>;
  };
};

GlobalSearch.propTypes = {
  icon: React.PropTypes.string,
  placeholder: React.PropTypes.string
};
