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
    };
  };

  /* <CheckBoxGroup
    heading='Anatomical Location'
    options={[
      {label: 'Frontal', checked: false},
      {label: 'Occipital', checked: false},
      {label: 'Cerebellum', checked: false},
      {label: 'Temporal', checked: false},
      {label: 'Basal ganglia', checked: false},
      {label: 'Brain stem', checked: false},
      {label: 'Parietal', checked: false},
    ]}
    displayColumns={3}
    className={'anatomical-loc'}
    editable
    otherTextbox
    otherTBLabel='Other'
  />
  */
  getCheckBoxes () {
    let options = [];
    let optionBuilder = [];
    var count = 0;

    this.props.options.map((o) => {
      count++;
      if (o.checked) {
        optionBuilder.push(
          <label className={styles['cbg-label']}>
            <input type='checkbox' defaultChecked/>
            {o.label}
          </label>
        );
      } else if (this.state.isEditable) {
        optionBuilder.push(
          <label className={styles['cbg-label']}>
            <input type='checkbox'/>
          {o.label}
          </label>
        );
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
  displayColumns: React.PropTypes.number,
  className: React.PropTypes.string,
  editable: React.PropTypes.boolean,
  otherTextbox: React.PropTypes.boolean,
  otherTBLabel: React.PropTypes.string
};
