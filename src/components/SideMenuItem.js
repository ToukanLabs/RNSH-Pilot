import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

export default class SideMenuItem extends Component {
  render () {
    var displayText = () => {
      if (this.props.showText) {
        return this.props.text;
      }
    };

    if (this.props.linkTo === this.props.currentRouterPath) {
      return (
        <li>
          <FontAwesome name={this.props.icon}/>
          {displayText()}
        </li>
      );
    } else {
      return (
        <li>
          <Link to={this.props.linkTo}>
            <FontAwesome name={this.props.icon}/>
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
