import React, { Component } from 'react';
import styles from './Modal.scss';
import { Link } from 'react-router';

export default class Modal extends Component {
  render () {
    return (
      <div className={styles['modal']}>
        <div className={styles['header']}>
          <h2>{this.props.modalHeading}</h2>
        </div>
        <div className={styles['content']}>
          <Link to={this.props.returnTo}>
            <span title='Close' className={styles['close']}>X</span>
          </Link>
          <div >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  };
};

Modal.propTypes = {
  children: React.PropTypes.element,
  returnTo: React.PropTypes.function,
  modalHeading: React.PropTypes.string.isRequired,
};
