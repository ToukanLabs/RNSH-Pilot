import React, {Component} from 'react';
import { Select, DateTimeInput, TextInput } from './widgets';
import Panel from './Panel';
import styles from './PatientOverviewDemographics.scss';

export default class PatientOverviewDemographics extends Component {

  render () {
    return (
      <Panel className={styles['demographics-panel']}>
        <div className={styles['demographics-grid-part-one']}>
          <DateTimeInput label='1st Consultation' noTime mandatory className={styles['po-field-general']}/>
          <TextInput
            ref='poAge'
            label='Age'
            type='text'
            className={styles['po-field-general']}
          />
          <TextInput
            ref='poOccupation'
            label='Occupation'
            type='text'
            className={styles['po-field-general']}
          />
        </div>
        <div className={styles['demographics-grid-part-two']}>
          <Select
            label='Current Status'
            className={styles['po-field-general']}
            options={[
              {key: 'Alive', value: 'Alive'},
              {key: 'Deceased', value: 'Deceased'},
            ]}
          />
          <Select
            label='Level of Education'
            className={styles['po-field-general']}
            options={[
              {key: 'Secondary', value: 'Secondary'},
              {key: 'Tertiary', value: 'Tertiary'},
            ]}
          />
          <Select
            label='Social Support'
            className={styles['po-field-general']}
            options={[
              {key: '0 - Lives alone / nil support', value: '0'},
              {key: '1 - Lives alone / has family or community support', value: '1'},
              {key: '2 - Lives with partner', value: '2'},
              {key: '3 - Nursing home', value: '3'},
              {key: '4 - Lives with friend/roommate', value: '4'},
              {key: '5 - Other', value: '5'},
            ]}
          />
        </div>
        <div className={styles['demographics-grid-part-three']}>
          <Select
            label='Handedness'
            className={styles['po-field-general']}
            options={[
              {key: 'Left', value: 'Left'},
              {key: 'Right', value: 'Right'},
            ]}
          />
          <Select
            label='Link to Pall Care'
            className={styles['po-field-general']}
            options={[
              {key: 'Yes', value: 'Y'},
              {key: 'No', value: 'N'},
            ]}
          />
          <DateTimeInput label='Date Linked' noTime mandatory className={styles['po-field-general']}/>
        </div>
      </Panel>
    );
  };

};
