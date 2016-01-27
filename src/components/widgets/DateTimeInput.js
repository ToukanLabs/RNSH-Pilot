import React, {Component} from 'react';
import Datetime from 'react-datetime';
import corestyles from '../../styles/core.scss';

export default class DateTimeInput extends Component {
  renderWidget () {
    const dateFormat = (this.props.noDate) ? false : 'DD/MM/YYYY';
    const timeFormat = (this.props.noTime) ? false : 'HH:MM';
    return (
      <Datetime
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        disabled={this.props.disabled}
        />
    );
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
    const labelClassName = (this.props.labelClassName) ? this.props.labelClassName : null;

    if (this.props.label) {
      return (
        <label
          className={labelClassName}
          >
          {this.props.label}
          {this.getMandatoryIndicator()}:
          {this.renderWidget()}
        </label>
      );
    } else {
      return (
        <span className={corestyles['widget-wrapper']}>
          {this.renderWidget()}
        </span>
      );
    }
  }
};

DateTimeInput.propTypes = {
  noTime: React.PropTypes.bool,
  noDate: React.PropTypes.bool,
  label: React.PropTypes.string,
  labelClassName: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
};
