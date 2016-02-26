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

  handleOnChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render () {
    const className = (this.props.className) ? this.props.className : null;
    const labelClassName = (this.props.labelClassName) ? this.props.labelClassName : null;

    if (this.props.label) {
      return (
        <span className={corestyles['widget-wrapper']}>
          <span
            className={`${corestyles['widget-label']} ${labelClassName}`}
            >
            {this.props.label}
            {this.getMandatoryIndicator()}:
          </span>
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
  value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
  defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
  placeholder: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};
