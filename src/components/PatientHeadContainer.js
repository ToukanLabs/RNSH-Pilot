import React, {Component} from 'react';
import PatientHeader from 'components/PatientHeader';
import PatientHeaderDetails from 'components/PatientHeaderDetails';
import styles from './PatientHeadContainer.scss';
import FontAwesome from 'react-fontawesome';

export default class PatientHeadContainer extends Component {
  render () {
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
          <PatientHeaderDetails/>
          <div className={styles['phc-detail-down-icon']}>
            <FontAwesome
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
