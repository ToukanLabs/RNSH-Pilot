import React, {Component} from 'react';
// import corestyles from '../../styles/core.scss';
import Icon from '../Icon.js';
import styles from './widgets.scss';

export default class CheckBoxGroup extends Component {

  constructor () {
    super();
    this.state = {
      isEditable: false,
      editableClass: 'cbg-ro',
      tickedItems: [],
    };
  };

  componentWillMount () {
    this.setState({
      ...this.state,
      tickedItems: this.props.options,
    });
  };

  itemChange = (e) => {
    var tempArr = this.state.tickedItems;
    for (var i in tempArr) {
      if (tempArr[i].label === e.target.value) {
        tempArr[i].checked = e.target.checked;
        break;
      }
    }
    this.setState({
      ...this.state,
      tickedItems: tempArr,
    });
  };

  getCheckBoxes () {
    let options = [];
    let optionBuilder = [];
    var count = 0;

    this.state.tickedItems.map((o) => {
      count++;
      if (this.state.isEditable || o.checked) {
        if (!this.state.isEditable) {
          optionBuilder.push(
            <span className={styles['cbg-label']}>
              {o.label}
            </span>
          );
        } else {
          optionBuilder.push(
            <label className={styles['cbg-label']}>
              <input
                type='checkbox'
                checked={o.checked}
                value={o.label}
                onChange={this.itemChange}
                disabled={!this.state.isEditable}
              />
              {o.label}
            </label>
          );
        }
      }

      if (count % this.props.displayColumns === 0) {
        options.push(
          <div>
            {optionBuilder}
          </div>
        );
        optionBuilder = [];
      }
    });

    if (optionBuilder.length > 0) {
      options.push(
        <div>
          {optionBuilder}
        </div>
      );
    }

    return options;
  };

  getIcon () {
    return (this.state.isEditable) ? 'check' : 'pencil';
  };

  handleOnClick = () => {
    this.setState({
      ...this.state,
      isEditable: !this.state.isEditable,
      editableClass: (this.state.isEditable ? 'cbg-ro' : 'cbg-editable')
    });
  };

  render () {
    return (
      <div className={styles['cbg-container'] + ' ' + styles[this.state.editableClass]}
        onClick={() => {
          if (!this.state.isEditable) {
            this.handleOnClick();
          }
        }}>
        <div className={this.props.className + ' ' + styles['cbg']}>
          <h3 className={this.props.headingClass}>{this.props.heading}</h3>
          {this.getCheckBoxes()}
        </div>
        <span className={styles['cbg-icon']} onClick={this.handleOnClick}>
          <Icon name={this.getIcon()}/>
        </span>
      </div>
    );
  };
};

CheckBoxGroup.propTypes = {
  heading: React.PropTypes.string.isRequired,
  headingClass: React.PropTypes.string,
  options: React.PropTypes.array.isRequired,
  displayColumns: React.PropTypes.number.isRequired,
  className: React.PropTypes.string,
  editable: React.PropTypes.boolean,
  otherTextbox: React.PropTypes.boolean,
  otherTBLabel: React.PropTypes.string
};
