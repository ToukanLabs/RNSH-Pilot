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
        <span className={corestyles['widgetWrapper']}>
          <span
            className={`${corestyles['widgetLabel']} ${labelClassName}`}
            >
            {this.props.label}
            {this.getMandatoryIndicator()}:
          </span>
          <input
            className={className}
            type='text'
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            value={this.props.value}
            defaultValue={this.props.defaultValue}
            {...this.props.formField}
            />
          {this.getUnitLabel()}
        </span>
      );
    } else {
      return (
        <span className={corestyles['widgetWrapper']}>
          <input
            className={className}
            type='text'
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            value={this.props.value}
            defaultValue={this.props.defaultValue}
            {...this.props.formField}
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
  value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  unitLabel: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  formField: React.PropTypes.object,
};
