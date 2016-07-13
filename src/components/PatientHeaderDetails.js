import React, {Component} from 'react';
import styles from './PatientHeaderDetails.scss';

export default class PatientHeaderDetails extends Component {
  render () {
    const expandedData = () => {
      if (this.props.visibility === 'expanded') {
        return (
          <div className={styles['phd-details']}>
            {this.props.phdDetails}
          </div>
        );
      } else {
        return <div></div>;
      }
    };

    const label = () => {
      if (this.props.visibility === 'expanded') {
        return (
          <label className={styles['phd-header-label']}>
            {this.props.phdLabel}
          </label>
        );
      } else {
        return (
          <label className={styles['phd-header-label']}>
            {this.props.phdLabel}:&nbsp;
            <span className={styles['phd-header-data']}>
              {this.props.phdHeaderData}
            </span>
          </label>
        );
      }
    };

    if (this.props.phdLabel !== undefined) {
      return (
        <div className={styles['phd-container']}>
          <div>
            {label()}
          </div>
          {expandedData()}
        </div>
      );
    } else {
      return (
        <div className={styles['phd-container']}>&nbsp;</div>
      );
    }
  };
};

PatientHeaderDetails.propTypes = {
  phdLabel: React.PropTypes.string,
  phdHeaderData: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]),
  phdDetails: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]),
  visibility: React.PropTypes.string,
};
