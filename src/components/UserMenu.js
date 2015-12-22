import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import styles from './UserMenu.scss';

export default class UserMenu extends Component {
  render () {
    return <div>
      <FontAwesome name={this.props.icon} className={styles['um-icon']}/>
      <select className={styles['um-bar']}>
        <option value='DRJi' selected>Dr John Doe</option>
      </select>
    </div>;
  };
};

UserMenu.propTypes = {
  icon: React.PropTypes.string
};
