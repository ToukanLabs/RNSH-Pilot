import React, {Component} from 'react';
import { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import Dropdown from './Dropdown';
import styles from './GlobalMenu.scss';
import { Link } from 'react-router';

export default class GlobalMenu extends Component {
  render () {
    return (
      <div className={styles['menu-drop-wrapper']}>
        <Dropdown>
          <DropdownTrigger>
            <span className={styles['trigger-span']}>Main Menu </span>
          </DropdownTrigger>
          <DropdownContent className={styles['dropdown__content']}>
             <ul>
                 <li>
                   <Link to='/'>
                     Home
                   </Link>
                 </li>
             </ul>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  };
};
