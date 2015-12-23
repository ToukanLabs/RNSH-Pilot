import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import styles from './UserMenu.scss';

export default class UserMenu extends Component {
  render () {
    return (
      <span>
        <FontAwesome name={this.props.icon} className={styles['um-icon']}/>
        <select className={styles['um-bar']}>
          <option value='DRJi'>Dr John Doe</option>
        </select>
      </span>
    );
  };
};

UserMenu.propTypes = {
  icon: React.PropTypes.string
};
