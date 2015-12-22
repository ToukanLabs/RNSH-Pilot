import React, {Component} from 'react';
import styles from './GlobalMenu.scss';

export default class GlobalMenu extends Component {
  render () {
    return <div>
      <select className={styles['gm-bar']}>
        <option value='volvo'>Main Navigation Menu</option>
      </select>
    </div>;
  };
};
