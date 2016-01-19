import React, { Component } from 'react';
import styles from './Panel.scss';

export default class Panel extends Component {
  getTitle () {
    if (this.props.title) {
      return (
        <h2>
          {this.props.title}
        </h2>
      );
    }
  }

  render () {
    return (
      <div className={styles['panel'] + ' ' + this.props.className}>
        {this.getTitle()}
        {this.props.children}
      </div>
    );
  };
};

Panel.propTypes = {
  title: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.array,
};
