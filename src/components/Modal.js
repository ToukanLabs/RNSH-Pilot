import React, { Component } from 'react';
import styles from '../styles/core.scss';
import { Link } from 'react-router';

export default class Modal extends Component {
  constructor () {
    super();
    this.modalStyles = {
      position: 'fixed',
      top: '17%',
      right: '17%',
      bottom: '17%',
      left: '17%',
      boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
      background: '#fff',
      WebkitTransition: 'opacity 400ms ease-in',
      MozTransition: 'opacity 400ms ease-in',
      transition: 'opacity 400ms ease-in',
    };
    this.modalBodyStyles = {
      background: '#fff',
      padding: 20,
      height: '90%',
      overflowY: 'auto',
    };
    this.modalHeaderStyles = {
      width: '100%',
      height: '10%',
      backgroundColor: '#ECECEC',
      padding: 20,
    };
  }
  render () {
    return (
      <div style={this.modalStyles}>
        <div style={this.modalHeaderStyles}>
          <h2>{this.props.modalHeading}</h2>
        </div>
        <div style={this.modalBodyStyles}>
          <Link to={this.props.returnTo}>
            <a href='#' title='Close' className={styles['close']}>X</a>
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
