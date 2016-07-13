import React, { Component } from 'react';
import Icon from './Icon';
import styles from './Loading.scss';

export default class Loading extends Component {
  render () {
    return (
      <div className={styles['loading-container']}>
        <Icon name='circle-o-notch' spin /> Loading...
      </div>
    );
  };
};
