import React, { Component } from 'react';
import GlobalSearch from 'components/GlobalSearch';
import GlobalMenu from 'components/GlobalMenu';
import UserMenu from 'components/UserMenu';
import styles from './GlobalHeader.scss';

export default class GlobalHeader extends Component {
  render () {
    return <div className={styles['gh-border']}>
      <GlobalMenu />
      <GlobalSearch icon='search' placeholder='Global Search'/>
      <UserMenu icon='fa fa-smile-o'/>
    </div>;
  };
};
