import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './GlobalSearch.scss';

export default class GlobalSearch extends Component {
  render () {
    return (
      <input
        ref='searchBox'
        placeholder={this.props.placeholder}
        className={styles['gs-input']}
        onChange={this.props.onChange}
        onKeyUp={this.props.onKeyUp}
        onFocus={this.props.onFocus}
        onClick={() => {
          findDOMNode(this).select();
        }}
      />
    );
  };
};

GlobalSearch.propTypes = {
  placeholder: React.PropTypes.string,
  onFocus: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onKeyUp: React.PropTypes.func.isRequired,
  styles: React.PropTypes.object
};
