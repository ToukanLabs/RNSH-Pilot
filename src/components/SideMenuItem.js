import React, { Component } from 'react';
import Icon from './Icon';
import { Link } from 'react-router';
import styles from './SideMenuItem.scss';

export default class SideMenuItem extends Component {
  render () {
    var displayText = () => {
      if (this.props.showText) {
        return this.props.text;
      }
    };

    if (this.props.linkTo === this.props.currentRouterPath) {
      return (
        <li className={styles['smi-menu-item']}>
          <Icon name={this.props.icon} className={styles['smi-icon']}/>
          {displayText()}
        </li>
      );
    } else {
      return (
        <li className={styles['smi-menu-item']}>
          <Link to={this.props.linkTo}>
            <Icon name={this.props.icon} className={styles['smi-icon']}/>
            {displayText()}
          </Link>
        </li>
      );
    }
  };
};

SideMenuItem.propTypes = {
  icon: React.PropTypes.string,
  text: React.PropTypes.string,
  linkTo: React.PropTypes.string,
  currentRouterPath: React.PropTypes.string,
  showText: React.PropTypes.bool
};
