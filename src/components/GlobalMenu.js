import React, {Component} from 'react';
import { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import Dropdown from './Dropdown';
import styles from './GlobalMenu.scss';
import { Link } from 'react-router';

export default class GlobalMenu extends Component {
  render () {
    return (
      <div className={styles['menu-drop-wrapper']}>
        <Dropdown height={108}>
          <DropdownTrigger>
            <span className={styles['trigger-span']}>Main Menu </span>
          </DropdownTrigger>
          <DropdownContent>
              <ul>
                <li>
                  <Link to='/'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={{
                    pathname: `/AddPatient`,
                    state: { modal: true, modalHeading: 'Add New Patient' }
                  }}>
                    Add a Patient
                  </Link>
                </li>
              </ul>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  };
};

GlobalMenu.propTypes = {
  uiActions: React.PropTypes.object,
};
