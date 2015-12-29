// Adapted from https://github.com/andreypopp/react-fa
// to use WebPacks style-loader functionality.

import React, { Component } from 'react';
import styles from '../styles/core.scss';

export default class Icon extends React.Component {
  static defaultProps = {
    Component: 'span'
  };

  render () {
    let {
      Component,
      name, size, rotate, flip, spin, fixedWidth, stack, inverse,
      pulse, className, ...props
    } = this.props;

    let classNames = `${styles['fa']} ${styles['fa-' + name]}`;

    if (size) {
      classNames = `${classNames} ${styles['fa-' + size]}`;
    }
    if (rotate) {
      classNames = `${classNames} ${styles['fa-rotate-' + rotate]}`;
    }
    if (flip) {
      classNames = `${classNames} ${styles['fa-flip-' + flip]}`;
    }
    if (fixedWidth) {
      classNames = `${classNames} ${styles['fa-fw']}`;
    }
    if (spin) {
      classNames = `${classNames} ${styles['fa-spin']}`;
    }
    if (pulse) {
      classNames = `${classNames} ${styles['fa-pulse']}`;
    }
    if (stack) {
      classNames = `${classNames} ${styles['fa-stack-' + stack]}`;
    }
    if (inverse) {
      classNames = `${classNames} ${styles['fa-inverse']}`;
    }
    if (className) {
      classNames = `${classNames} ${className}`;
    }

    return <Component {...props} className={classNames} />;
  }
}

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  size: React.PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
  rotate: React.PropTypes.oneOf(['45', '90', '135', '180', '225', '270', '315']),
  flip: React.PropTypes.oneOf(['horizontal', 'vertical']),
  fixedWidth: React.PropTypes.bool,
  spin: React.PropTypes.bool,
  pulse: React.PropTypes.bool,
  stack: React.PropTypes.oneOf(['1x', '2x']),
  inverse: React.PropTypes.bool,
  Component: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),
};
