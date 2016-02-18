import React, {Component} from 'react';
import Datetime from 'react-datetime';
import corestyles from '../../styles/core.scss';

export default class DateTimeInput extends Component {
  renderWidget (formField) {
    const dateFormat = (this.props.noDate) ? false : 'DD/MM/YYYY';
    const timeFormat = (this.props.noTime) ? false : 'HH:MM';
    return (
      <Datetime
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        disabled={this.props.disabled}
        value={(this.props.value) ? new Date(this.props.value) : null}
        closeOnSelect
        {...formField}
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
        <span className={corestyles['widget-wrapper']}>
          <span className={`${corestyles['widget-label']} ${labelClassName}`}
            >
            {this.props.label}
            {this.getMandatoryIndicator()}:
          </span>
          {this.renderWidget(this.props.formField)}
        </span>
      );
    } else {
      return (
        <span className={corestyles['widget-wrapper']}>
          {this.renderWidget(this.props.formField)}
        </span>
      );
    }
  }
};

DateTimeInput.propTypes = {
  noTime: React.PropTypes.bool,
  noDate: React.PropTypes.bool,
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  labelClassName: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  formField: React.PropTypes.object,
};
