import React, {Component} from 'react';
import corestyles from '../../styles/core.scss';

export default class DateTimeInput extends Component {
  componentWillMount () {
    this.name = this.props.ref;
  }

  // TODO: Implement functions to get the date and time properly.
  // getValue () {
  //   return this.refs[this.name].value;
  // }
  //
  // setValue (value) {
  //   this.refs[this.name].value = value;
  // }

  renderDateWidget () {
    if (!this.props.noDate) {
      return (
        <input
          ref={`${this.name}DateInput`}
          name={`${this.name}DateInput`}
          type='date'
          disabled={this.props.disabled}
          />
      );
    }
  }

  renderTimeWidget () {
    if (!this.props.noTime) {
      return (
        <input
          ref={`${this.name}TimeInput`}
          name={`${this.name}TimeInput`}
          type='time'
          disabled={this.props.disabled}
          />
      );
    }
  }

  isMandatory () {
    return this.props.mandatory;
  }

  getMandatoryIndicator () {
    if (this.isMandatory()) {
      return '*';
    }
  }

  render () {
    if (this.props.label) {
      return (
        <label>
          {this.props.label}
          {this.getMandatoryIndicator()}:
          {this.renderDateWidget()}
          {this.renderTimeWidget()}
        </label>
      );
    } else {
      return (
        <span className={corestyles['widget-wrapper']}>
          {this.renderDateWidget()}
          {this.renderTimeWidget()}
        </span>
      );
    }
  }
};

DateTimeInput.propTypes = {
  ref: React.PropTypes.string,
  noTime: React.PropTypes.bool,
  noDate: React.PropTypes.bool,
  label: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
};
