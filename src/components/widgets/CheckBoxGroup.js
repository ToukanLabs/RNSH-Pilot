import React, {Component} from 'react';
// import corestyles from '../../styles/core.scss';
// import styles from './widgets.scss';

export default class CheckBoxGroup extends Component {

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
  render () {
    return (
      <label>
        <input type='checkbox'/>
        Test
      </label>
    );
  };
};
