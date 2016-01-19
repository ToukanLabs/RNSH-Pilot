import React, {Component} from 'react';
import corestyles from '../../styles/core.scss';

export default class Input extends Component {
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
            type={this.props.type}
            placeholder={this.props.placeholder}
            />
          {this.getUnitLabel()}
        </label>
      );
    } else {
      return (
        <span className={corestyles['widget-wrapper']}>
          <input
            type={this.props.type}
            placeholder={this.props.placeholder}
            />
          {this.getUnitLabel()}
        </span>
      );
    }
  }
};

Input.propTypes = {
  type: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  unitLabel: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
};
