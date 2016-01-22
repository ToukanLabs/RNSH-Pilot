import React, { Component } from 'react';
import Icon from './Icon';
import { Link } from 'react-router';
import ReactTooltip from 'react-tooltip';
import styles from './SideMenuItem.scss';

export default class SideMenuItem extends Component {
  render () {
    var displayText = () => {
      if (this.props.showText) {
        return this.props.text;
      } else {
        return ' ';
      }
    };

    if (this.props.linkTo === this.props.currentRouterPath) {
      return (
        <li className={styles['smi-menu-item'] + ' ' + styles['smi-active']}>
          <Icon name={this.props.icon} className={styles['smi-icon']}/>
          {displayText()}
        </li>
      );
    } else if (this.props.showText) {
      return (
        <li className={styles['smi-menu-item']}>
          <Link to={this.props.linkTo}>
            <Icon name={this.props.icon} className={styles['smi-icon']}/>
            {displayText()}
          </Link>
        </li>
      );
    } else {
      return (
        <li className={styles['smi-menu-item']}>
          <Link data-tip data-for={`tt-${this.props.text}`} to={this.props.linkTo}>
            <Icon name={this.props.icon} className={styles['smi-icon']}/>
            {displayText()}
          </Link>
          <ReactTooltip
            id={`tt-${this.props.text}`}
            effect='solid'
            place='right'>
            <span>{this.props.text}</span>
          </ReactTooltip>
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
