import React, { Component } from 'react';
import styles from './GlobalSearch.scss';

export default class GlobalSearch extends Component {
  render () {
    return (
      <div className={styles['gs-input-wrapper']}>
        <input
          placeholder={this.props.placeholder}
          className={styles['gs-input']}
          />
      </div>
    );
  };
};

GlobalSearch.propTypes = {
  icon: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  styles: React.PropTypes.object
};
