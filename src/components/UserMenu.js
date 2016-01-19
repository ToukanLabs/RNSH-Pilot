import React, { Component } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import Icon from './Icon';
import styles from './UserMenu.scss';

export default class UserMenu extends Component {
  render () {
    return (
      <div className={styles['user-drop-wrapper']}>
        <span className={styles['um-icon-container']}>
          <Icon name='user' className={styles['um-icon']} />
        </span>
        <Dropdown className={styles['user-menu-dropdown']}>
          <DropdownTrigger>
            <span className={styles['trigger-span']}>{this.props.username} </span>
          </DropdownTrigger>
          <DropdownContent className={styles['dropdown__content']}>
             <ul>
                 <li>
                     <a href='#'>
                         Profile
                     </a>
                 </li>
                 <li>
                     <a href='#'>
                         Change Password
                     </a>
                 </li>
             </ul>
             <ul>
                 <li>
                     <a href='#'>
                         Log out
                     </a>
                 </li>
             </ul>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  }
};

UserMenu.propTypes = {
  icon: React.PropTypes.string,
  username: React.PropTypes.string
};
