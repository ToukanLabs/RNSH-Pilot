import React, {Component} from 'react';
import PatientHeader from 'components/PatientHeader';
import PatientHeaderDetails from 'components/PatientHeaderDetails';
import Icon from './Icon';
import styles from './PatientHeadContainer.scss';

export default class PatientHeadContainer extends Component {
  render () {
    var surgical = this.props.patient.surgical === 'Y' ? 'Surgical' : 'Non-Surgical';
    return (
      <div>
        <div>
          <PatientHeader patient={this.props.patient}/>
        </div>
        <div className={styles['phc-details']}>
          <PatientHeaderDetails
            phdLabel='Address'
            phdHeaderData={this.props.patient.address}
            phdDetails={this.props.patient}
          />
          <PatientHeaderDetails
            phdLabel='Phone & Email'
            phdHeaderData={this.props.patient.phone}
            phdDetails={this.props.patient}
          />
          <PatientHeaderDetails/>
          <PatientHeaderDetails/>
          <PatientHeaderDetails
            phdLabel='Status'
            phdHeaderData={surgical}
            phdDetails={this.props.patient}
          />
          <div className={styles['phc-detail-down-icon']}>
            <Icon
              name='angle-double-down'
              />
          </div>
        </div>
      </div>
    );
  };
};

PatientHeadContainer.propTypes = {
  patient: React.PropTypes.object
};
