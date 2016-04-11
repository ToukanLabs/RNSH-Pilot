import React, {Component} from 'react';
import { Select, DateTimeInput, TextInput } from './widgets';
import Panel from './Panel';
import styles from './PatientOverviewDemographics.scss';

export default class PatientOverviewDemographics extends Component {

  render () {
    return (
      <Panel className={styles.demographicsPanel}>
        <div className={styles.demographicsGridPartOne}>
          <DateTimeInput label='1st Consultation'
            noTime
            mandatory
            className={styles.poFieldGeneral}/>
          <TextInput
            ref='poAge'
            label='Age'
            type='text'
            className={styles.poFieldGeneral}
          />
          <TextInput
            ref='poOccupation'
            label='Occupation'
            type='text'
            className={styles.poFieldGeneral}
          />
        </div>
        <div className={styles.demographicsGridPartTwo}>
          <Select
            label='Current Status'
            className={styles.poFieldGeneral}
            options={[
              {key: 'Alive', value: 'Alive'},
              {key: 'Deceased', value: 'Deceased'},
            ]}
          />
          <Select
            label='Level of Education'
            className={styles.poFieldGeneral}
            options={[
              {key: 'Secondary', value: 'Secondary'},
              {key: 'Tertiary', value: 'Tertiary'},
            ]}
          />
          <Select
            label='Social Support'
            className={styles.poFieldGeneral}
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
        <div className={styles.demographicsGridPartThree}>
          <Select
            label='Handedness'
            className={styles.poFieldGeneral}
            options={[
              {key: 'Left', value: 'Left'},
              {key: 'Right', value: 'Right'},
            ]}
          />
          <Select
            label='Link to Pall Care'
            className={styles.poFieldGeneral}
            options={[
              {key: 'Yes', value: 'Y'},
              {key: 'No', value: 'N'},
            ]}
          />
          <DateTimeInput label='Date Linked' noTime mandatory className={styles.poFieldGeneral}/>
        </div>
      </Panel>
    );
  };

};
