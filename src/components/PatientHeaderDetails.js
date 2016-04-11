import React, {Component} from 'react';
import styles from './PatientHeaderDetails.scss';

export default class PatientHeaderDetails extends Component {
  render () {
    const expandedData = () => {
      if (this.props.visibility === 'expanded') {
        if (this.props.phdType === 'image') {
          return (
            <div className={styles.profileImageContainer}>
              <span className={styles.profileImageHelper}></span>
              <img src={this.props.phdDetails} className={styles.profileImage} />
            </div>
          );
        } else {
          return (
            <div className={styles.phdDetails}>
              {this.props.phdDetails}
            </div>
          );
        }
      } else {
        return <div></div>;
      }
    };

    const label = () => {
      if (this.props.visibility === 'expanded') {
        return (
          <label className={styles.phdHeaderLabel}>
            {this.props.phdLabel}
          </label>
        );
      } else {
        return (
          <label className={styles.phdHeaderLabel}>
            {this.props.phdLabel}:&nbsp;
            <span className={styles.phdHeaderData}>
              {this.props.phdHeaderData}
            </span>
          </label>
        );
      }
    };

    if (this.props.phdLabel !== undefined) {
      return (
        <div className={styles.phdContainer}>
          <div>
            {label()}
          </div>
          {expandedData()}
        </div>
      );
    } else if (this.props.phdDetails !== undefined) {
      return (
        <div className={styles.phdContainer}>
          {expandedData()}
        </div>
      );
    } else {
      return (
        <div className={styles.phdContainer}>&nbsp;</div>
      );
    }
  };
};

PatientHeaderDetails.propTypes = {
  phdLabel: React.PropTypes.string,
  phdType: React.PropTypes.string,
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
