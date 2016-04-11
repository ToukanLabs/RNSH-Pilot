import React, {Component} from 'react';
import corestyles from '../../styles/core.scss';
import styles from './widgets.scss';

export default class TextArea extends Component {
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

  handleOnChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
      this.setState({value: e.target.value});
    } else {
      this.setState({value: e.target.value});
    }
  };

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
          <textarea
            className={className}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            value={this.props.value}
            onChange={this.handleOnChange}
            />
          {this.getUnitLabel()}
        </span>
      );
    } else {
      return (
        <span className={corestyles['widgetWrapper']}>
          <textarea
            className={className}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            value={this.props.value}
            onChange={this.handleOnChange}
            />
          {this.getUnitLabel()}
        </span>
      );
    }
  }
};

TextArea.propTypes = {
  ref: React.PropTypes.string,
  className: React.PropTypes.string,
  labelClassName: React.PropTypes.string,
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  unitLabel: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};
