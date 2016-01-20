import React, {Component} from 'react';
import corestyles from '../../styles/core.scss';

export default class TextInput extends Component {
  componentWillMount () {
    this.name = this.props.ref + 'Input';
  }

  getValue () {
    return this.refs[this.name].value;
  }

  setValue (value) {
    this.refs[this.name].value = value;
  }

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
        <span>{this.props.unitLabel}</span>
      );
    }
  }

  render () {
    if (this.props.label) {
      return (
        <label>
          {this.props.label}
          {this.getMandatoryIndicator()}:
          <input
            ref={this.name}
            name={this.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            />
          {this.getUnitLabel()}
        </label>
      );
    } else {
      return (
        <span className={corestyles['widget-wrapper']}>
          <input
            ref={this.name}
            name={this.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            />
          {this.getUnitLabel()}
        </span>
      );
    }
  }
};

TextInput.propTypes = {
  ref: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  unitLabel: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
};
