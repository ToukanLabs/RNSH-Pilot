import React, {Component} from 'react';
import { Select, TextInput, DateTimeInput, InlineWidgetGroup, CheckBoxGroup } from './widgets';
import Panel from './Panel';
import styles from './PatientOverviewDiagnosis.scss';

export default class PatientOverviewDiagnosis extends Component {

  render () {
    return (
      <Panel title='Diagnosis' className={styles.diagnosisPanel}>
        <div className={styles.diagnosisGridPart}>
          <DateTimeInput label='Date of Pre-Op MRI' noTime mandatory className={styles['poFieldGeneral']}/>
          <Select
            label='Enhancement'
            className={styles.poFieldGeneral}
            options={[
              {key: 'Yes', value: 'Y'},
              {key: 'No', value: 'N'},
            ]}
          />
          <Select
            label='Calcification'
            className={styles.poFieldGeneral}
            options={[
              {key: 'Yes', value: 'Y'},
              {key: 'No', value: 'N'},
            ]}
          />
          <Select
            label='Haemorrhage'
            className={styles.poFieldGeneral}
            options={[
              {key: 'Yes', value: 'Y'},
              {key: 'Nil', value: 'N'},
            ]}
          />
          <Select
            label='Diagnosis'
            className={styles.poFieldGeneral}
            options={[
              {key: 'Anaplastic astrocytoma (G3)', value: 'Anaplastic astrocytoma (G3)'},
              {key: 'Anaplastic oligodendroglioma (G3)', value: 'Anaplastic oligodendroglioma (G3)'},
              {key: 'Anaplastic oligoastrocytoma (G3)', value: 'Anaplastic oligoastrocytoma (G3)'},
              {key: 'Astrocytoma (G1/G2)', value: 'Astrocytoma (G1/G2)'},
              {key: 'Medulloblastoma', value: 'Medulloblastoma'},
              {key: 'Meningioma', value: 'Meningioma'},
              {key: 'Oligodendroglioma (G2)', value: 'Oligodendroglioma (G2)'},
              {key: 'Oligoastrocytoma (G2)', value: 'Oligoastrocytoma (G2)'},
              {key: 'Primary CNS lymphoma', value: 'Primary CNS lymphoma'},
              {key: 'GBM (G4)', value: 'GBM (G4)'},
              {key: 'Other', value: 'Other'},
            ]}
          />
        </div>
        <div className={styles.diagnosisGridPart}>
          <CheckBoxGroup
            heading='Anatomical Location'
            options={[
              {id: 'al-1', label: 'Frontal', checked: true},
              {id: 'al-2', label: 'Occipital', checked: false},
              {id: 'al-3', label: 'Cerebellum', checked: false},
              {id: 'al-4', label: 'Temporal', checked: false},
              {id: 'al-5', label: 'Basal ganglia', checked: false},
              {id: 'al-6', label: 'Brain stem', checked: false},
              {id: 'al-7', label: 'Parietal', checked: false},
            ]}
            displayColumns={3}
            className={'anatomicalLoc'}
            otherTBLabel='Other'
          />
          <CheckBoxGroup
            heading='Laterality'
            options={[
              {id: 'cbl-1', label: 'Left centered', checked: true},
              {id: 'cbl-2', label: 'Right centered', checked: false},
              {id: 'cbl-3', label: 'Crosses midline', checked: false},
              {id: 'cbl-4', label: 'Midline centered', checked: false},
            ]}
            displayColumns={2}
            className={'laterality'}
          />
        <h3 className={styles.diagnosisGridPartHeading}>Enhancing Mass Size (Greatest Diameter Enhancing Region)</h3>
          <InlineWidgetGroup>
            <TextInput
              ref='poEMS_L'
              type='text'
              unitLabel=' mm  X '
              className={styles.poFieldEMS}
            />
            <TextInput
              ref='poEMS_W'
              type='text'
              unitLabel=' mm  X '
              className={styles.poFieldEMS}
            />
            <TextInput
              ref='poEMS_H'
              type='text'
              unitLabel=' mm  X    (L x W x H)'
              className={styles.poFieldEMS}
            />
          </InlineWidgetGroup>
          <h3 className={styles.diagnosisGridPartHeading}>Non Enhancing Mass Size (Greatest Diameter Enhancing Region)</h3>
          <InlineWidgetGroup>
            <TextInput
              ref='poNEMS_L'
              type='text'
              unitLabel=' mm  X '
              className={styles.poFieldEMS}
            />
            <TextInput
              ref='poNEMS_W'
              type='text'
              unitLabel=' mm  X '
              className={styles.poFieldEMS}
            />
            <TextInput
              ref='poNEMS_H'
              type='text'
              unitLabel=' mm  X    (L x W x H)'
              className={styles.poFieldEMS}
            />
          </InlineWidgetGroup>
        </div>
      </Panel>
    );
  };
};
