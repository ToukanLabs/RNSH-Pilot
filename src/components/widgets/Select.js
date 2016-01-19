import React, {Component} from 'react';
import corestyles from '../../styles/core.scss';

export default class Select extends Component {
  isMandatory () {
    return this.props.mandatory;
  }

  getMandatoryIndicator () {
    if (this.isMandatory()) {
      return '*';
    }
  }

  getOptions () {
    return this.props.options.map((o) => {
      return (
        <option
          key={o.value}
          value={o.value}
          >
          {o.key}
        </option>
      );
    });
  }

  render () {
    if (this.props.label) {
      return (
        <label>
          {this.props.label}
          {this.getMandatoryIndicator()}:
          <select>
            {this.getOptions()}
          </select>
        </label>
      );
    } else {
      return (
        <span className={corestyles['widget-wrapper']}>
          <select>
            {this.getOptions()}
          </select>
        </span>
      );
    }
  }
};

Select.propTypes = {
  label: React.PropTypes.string,
  options: React.PropTypes.array.isRequired,
  placeholder: React.PropTypes.string,
  mandatory: React.PropTypes.bool,
};
