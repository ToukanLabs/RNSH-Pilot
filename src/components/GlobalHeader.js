import React, { Component } from 'react';
import GlobalSearch from 'components/GlobalSearch';
import GlobalMenu from 'components/GlobalMenu';
import UserMenu from 'components/UserMenu';
import styles from './GlobalHeader.scss';
import { Link } from 'react-router';

export default class GlobalHeader extends Component {
  render () {
    return (
      <div className={styles['gh-header']}>
        <Link to='/'>
          <img src='/img/favicon.png'
            height='60'
            width='60'
            className={styles['gh-home-img']}
            />
        </Link>
        <div className={styles['gh-header-content']}>
          <div className={styles['gh-menu-container']}>
            <GlobalMenu />
          </div>
          <div className={styles['gh-search-container']}>
            <GlobalSearch icon='search' placeholder='Global Search'/>
          </div>
          <div className={styles['gh-user-container']}>
            <UserMenu icon='fa fa-smile-o'/>
          </div>
        </div>
      </div>
    );
  };
};
