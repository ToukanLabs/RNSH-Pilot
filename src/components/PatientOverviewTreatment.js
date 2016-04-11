import React, {Component} from 'react';
import { Select } from './widgets';
import Panel from './Panel';
import styles from './PatientOverviewTreatment.scss';

export default class PatientOverviewTreatment extends Component {

  render () {
    return (
      <Panel title='Treatment' className={styles.treatmentPanel}>
        <div className={styles.treatmentGridPartLeft}>
          <Select
            label='Surgery'
            className={styles.poFieldGeneral}
            options={[
              {key: 'Yes', value: 'Y'},
              {key: 'No', value: 'N'},
            ]}
          />
          <Select
            label='Chemotherapy'
            className={styles.poFieldGeneral}
            options={[
              {key: 'Yes', value: 'Y'},
              {key: 'No', value: 'N'},
            ]}
          />
        </div>
        <div className={styles.treatmentGridPartMiddle}>
          <Select
            label='Radiotherapy'
            className={styles.poFieldGeneral}
            options={[
              {key: 'Yes', value: 'Y'},
              {key: 'No', value: 'N'},
            ]}
          />
          <Select
            label='Local Recurrence'
            className={styles.poFieldGeneral}
            options={[
              {key: 'Yes', value: 'Y'},
              {key: 'No', value: 'N'},
            ]}
          />
        </div>
        <div className={styles.treatmentGridPartRight}>
          <Select
            label='Extent of Resection'
            className={styles.poFieldGeneral}
            options={[
              {key: 'Biopsy', value: 'Biopsy'},
              {key: 'NA', value: 'NA'},
            ]}
          />
          <Select
            label='Technique'
            className={styles.poFieldGeneral}
            options={[
              {key: 'IMRT', value: 'IMRT'},
              {key: 'Unknown', value: 'Unknown'},
            ]}
          />
        </div>
      </Panel>
    );
  };
};
