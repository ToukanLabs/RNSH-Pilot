import React, {Component} from 'react';
import corestyles from '../../styles/core.scss';

export default class Select extends Component {
  constructor () {
    super();
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  isMandatory () {
    return this.props.mandatory;
  }

  getMandatoryIndicator () {
    if (this.isMandatory()) {
      return '*';
    }
  }

  getOptions () {
    const options = [];

    if (!this.props.mandatory) {
      options.push(<option key='null' value=''></option>);
    }

    this.props.options.map((o) => {
      options.push(
        <option
          key={o.value}
          value={o.value}
          >
          {o.key}
        </option>
      );
    });

    return options;
  }

  handleOnChange (event) {
    if (this.props.onChange) {
      this.props.onChange(event);
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
          <select
            className={className}
            onChange={this.handleOnChange}
            disabled={this.props.disabled}
            value={this.props.value}
            defaultValue={this.props.defaultValue}
            >
            {this.getOptions()}
          </select>
        </label>
      );
    } else {
      return (
        <span className={corestyles['widget-wrapper']}>
          <select
            className={className}
            onChange={this.handleOnChange}
            disabled={this.props.disabled}
            value={this.props.value}
            defaultValue={this.props.defaultValue}
            >
            {this.getOptions()}
          </select>
        </span>
      );
    }
  }
};

Select.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  labelClassName: React.PropTypes.string,
  options: React.PropTypes.array.isRequired,
  value: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};
