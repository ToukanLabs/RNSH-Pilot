import React, {Component} from 'react';
import { Select } from './widgets';
import Panel from './Panel';
import styles from './PatientOverviewTreatment.scss';

export default class PatientOverviewTreatment extends Component {

  render () {
    return (
      <Panel title='Treatement' className={styles['treatment-panel']}>
        <div className={styles['treatment-grid-part']}>
          <Select
            label='Surgery'
            className={styles['po-field-general']}
            options={[
              {key: 'Yes', value: 'Y'},
              {key: 'No', value: 'N'},
            ]}
          />
          <Select
            label='Chemotherapy'
            className={styles['po-field-general']}
            options={[
              {key: 'Yes', value: 'Y'},
              {key: 'No', value: 'N'},
            ]}
          />
        </div>
        <div className={styles['treatment-grid-part']}>
          <Select
            label='Radiotherapy'
            className={styles['po-field-general']}
            options={[
              {key: 'Yes', value: 'Y'},
              {key: 'No', value: 'N'},
            ]}
          />
          <Select
            label='Local Recurrence'
            className={styles['po-field-general']}
            options={[
              {key: 'Yes', value: 'Y'},
              {key: 'No', value: 'N'},
            ]}
          />
        </div>
        <div className={styles['treatment-grid-part']}>
          <Select
            label='Extent of Resection'
            className={styles['po-field-general']}
            options={[
              {key: 'Biopsy', value: 'Biopsy'},
              {key: 'NA', value: 'NA'},
            ]}
          />
          <Select
            label='Technique'
            className={styles['po-field-general']}
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
