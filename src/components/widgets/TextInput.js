import React, {Component} from 'react';
import corestyles from '../../styles/core.scss';
import styles from './widgets.scss';

export default class TextInput extends Component {
  isMandatory () {
    return this.props.mandatory;
  }

  getMandatoryIndicator () {
    if (this.isMandatory()) {
      return '*';
    }
  }

  getUnitLabel () {
    if (this.props.unitLabel) {
      return (
        <span className={styles['unit-label']}>
          {this.props.unitLabel}
        </span>
      );
    }
  }

  render () {
    const className = (this.props.className) ? this.props.className : null;
    const labelClassName = (this.props.labelClassName) ? this.props.labelClassName : null;

    if (this.props.label) {
      return (
        <label
          className={labelClassName}
          >
          {this.props.label}
          {this.getMandatoryIndicator()}:
          <input
            className={className}
            type='text'
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            value={this.props.value}
            />
          {this.getUnitLabel()}
        </label>
      );
    } else {
      return (
        <span className={corestyles['widget-wrapper']}>
          <input
            className={className}
            type='text'
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            value={this.props.value}
            />
          {this.getUnitLabel()}
        </span>
      );
    }
  }
};

TextInput.propTypes = {
  ref: React.PropTypes.string,
  className: React.PropTypes.string,
  labelClassName: React.PropTypes.string,
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  unitLabel: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
};
