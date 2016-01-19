import React, {Component} from 'react';
import corestyles from '../../styles/core.scss';
import widgetstyles from './widgets.scss';

export default class Select extends Component {
  constructor () {
    super();
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillMount () {
    this.name = this.props.ref + 'Select';
  }

  getValue () {
    return this.refs[this.name].value;
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

  handleOnChange () {
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  render () {
    if (this.props.label) {
      return (
        <label>
          {this.props.label}
          {this.getMandatoryIndicator()}:
          <select
            name={this.name}
            ref={this.name}
            onChange={this.handleOnChange}
            disabled={this.props.disabled}
            >
            {this.getOptions()}
          </select>
        </label>
      );
    } else {
      return (
        <span className={corestyles['widget-wrapper']}>
          <select
            name={this.name}
            ref={this.name}
            onChange={this.handleOnChange}
            disabled={this.props.disabled}
            >
            {this.getOptions()}
          </select>
        </span>
      );
    }
  }
};

Select.propTypes = {
  ref: React.PropTypes.string,
  label: React.PropTypes.string,
  options: React.PropTypes.array.isRequired,
  placeholder: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};
