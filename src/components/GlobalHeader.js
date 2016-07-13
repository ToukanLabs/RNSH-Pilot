import React, { Component } from 'react';
import GlobalSearchContainer from 'components/GlobalSearchContainer';
import GlobalMenu from 'components/GlobalMenu';
import UserMenu from 'components/UserMenu';
import styles from './GlobalHeader.scss';

export default class GlobalHeader extends Component {
  render () {
    return (
      <div className={styles['gh-header']}>
        <div className={styles['gh-header-content']}>
          <div className={styles['gh-menu-container']}>
            <GlobalMenu/>
          </div>
          <div className={styles['gh-search-container']}>
            <GlobalSearchContainer icon='search' placeholder='Global Search'/>
          </div>
          <div className={styles['gh-user-container']}>
            <UserMenu icon='user' username='Thilo Schuler'/>
          </div>
        </div>
      </div>
    );
  };
};
