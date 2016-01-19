import React, {Component} from 'react';
import corestyles from '../../styles/core.scss';

export default class DateTimeInput extends Component {
  renderDateWidget () {
    if (!this.props.noDate) {
      return (
        <input
          type='date'
          />
      );
    }
  }

  renderTimeWidget () {
    if (!this.props.noTime) {
      return (
        <input
          type='time'
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
  noTime: React.PropTypes.bool,
  noDate: React.PropTypes.bool,
  label: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
};
