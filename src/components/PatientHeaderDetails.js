import React, {Component} from 'react';
import styles from './PatientHeaderDetails.scss';

export default class PatientHeaderDetails extends Component {
  render () {
    return (
      <div className={styles['phd-container']}>
        <label className={styles['phd-header-label']}>
          {this.props.phdLabel}&nbsp;
          <span className={styles['phd-header-data']}>
            {this.props.phdHeaderData}
          </span>
        </label>
      </div>
    );
  };
};

PatientHeaderDetails.propTypes = {
  phdLabel: React.PropTypes.string,
  phdHeaderData: React.PropTypes.string,
  phdDetails: React.PropTypes.object
};
