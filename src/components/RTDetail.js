import React, {Component} from 'react';
import { Select, TextInput, InlineWidgetGroup } from './widgets';
import { FormattedDate } from 'react-intl';
import styles from './RTDetail.scss';

export default class RTDetail extends Component {

  render () {
    console.log('detail here');
    console.log(this.props.data);
    if (this.props.RTDetailViewId) {
      return (
        <div>
          <h3>Radiotherapy Treatment Period</h3>
          <div className={styles['rt-timeframe']}>
            from <FormattedDate
              value={Date.parse(this.props.data.start)}
              day='numeric'
              month='short'
              year='numeric'
            /> &nbsp;
            to <FormattedDate
              value={Date.parse(this.props.data.end)}
              day='numeric'
              month='short'
              year='numeric'
            />
          </div>
          <TextInput
            ref='rtDose'
            label='Dose'
            type='text'
            value={this.props.data.dose}
            className={styles['rt-field-general']}
            />
          <TextInput
            ref='rtFraction'
            label='Fraction'
            type='text'
            value={this.props.data.fractions}
            className={styles['rt-field-general']}
            />
            <Select
              ref='rtLocalisation'
              label='Localisation'
              className={styles['rt-field-general']}
              options={[
                {key: 'Bony', value: 'Bony'},
                {key: 'NA', value: 'NA'},
              ]}
            />
            <Select
              ref='rtLN'
              label='Lymph nodes treated?'
              className={styles['rt-field-general']}
              options={[
                {key: 'Yes', value: 'Y'},
                {key: 'No', value: 'N'},
              ]}
              />
        </div>
      );
    } else {
      return (
        <h3>Select a radiotherapy treatment period.</h3>
      );
    }
  };
};

RTDetail.propTypes = {
  data: React.PropTypes.object,
  RTDetailViewId: React.PropTypes.string
};
