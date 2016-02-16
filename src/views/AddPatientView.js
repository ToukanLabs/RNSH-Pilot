import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import styles from './AddPatientView.scss';
import corestyles from '../styles/core.scss';
import { actions as patientActions } from 'redux/modules/patient';
export const fields = ['mrn', 'firstName', 'lastName', 'dob', 'email', 'phone', 'gender', 'tumorType', 'surgical', 'address'];

const mapStateToProps = (state) => ({
  routerPath: state.router.path,
});

const mapDispatchToProps = (dispatch) => {
  return {
    patientActions: bindActionCreators(patientActions, dispatch),
  };
};

const validate = values => {
  const errors = {};
  if (!values.mrn) {
    errors.mrn = 'Required';
  }
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.dob) {
    errors.dob = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.phone) {
    errors.phone = 'Required';
  }
  if (!values.gender) {
    errors.gender = 'Required';
  }
  if (!values.tumorType) {
    errors.tumorType = 'Required';
  }
  if (!values.address) {
    errors.address = 'Required';
  }

  return errors;
};

export class AddPatientView extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    patientActions: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  createToken = () => {
    var currentdate = new Date();
    return 'NEWPATIENT-' + currentdate.getMonth().toString() + '-' + currentdate.getHours().toString() + '-' + currentdate.getMinutes().toString() + '-' + currentdate.getSeconds().toString();
  };

  submit = (values, dispatch) => {
    const body = {
      firstNames: values.firstName,
      lastNames: values.lastName,
      gender: (values.gender === 'M') ? 'MALE' : 'FEMALE',
      dateOfBirth: '1964-02-12T00:00:00.000Z', // values.dob,
      address: values.address,
      mrn: values.mrn,
      tumorType: values.tumorType,
      isSurgical: (values.surgical) ? 'true' : 'false',
      phone: values.phone,
      email: values.email,
    };
    const newToken = this.createToken();
    const patient = {
      token: newToken,
      id: '',
      firstname: values.firstName,
      surname: values.lastName,
      gender: (values.gender === 'M') ? 'MALE' : 'FEMALE',
      dob: '1964-02-12T00:00:00.000Z', // values.dob,
      address: values.address,
      mrn: values.mrn,
      tumorType: values.tumorType,
      surgical: (values.surgical) ? 'true' : 'false',
      phone: values.phone,
      email: values.email,
    };

    this.props.patientActions.createPatient(patient);

    const url = `${process.env.OPENEHR_URL}/patient/`;
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    const thisAddPatientView = this;

    fetch(url, options)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      dispatch(thisAddPatientView.props.patientActions.updatePatient(json, newToken));
    }).catch(function (ex) {
      console.log('parsing failed', ex);
    });
    this.context.router.goBack();
  };

  render () {
    const {
      fields: {mrn, firstName, lastName, dob, email, phone, gender, tumorType, surgical, address},
      handleSubmit,
      resetForm,
      submitting,
      } = this.props;
    return (
      <form className={styles['apv-form']} onSubmit={handleSubmit(this.submit)}>
        <div className={styles['apv-field-wrapper']}>
          <label className={corestyles['widget-label']}>MRN</label>
          <input type='text' placeholder='MRN' {...mrn}/>
          {mrn.touched && mrn.error && <span className={styles['apv-error-span']}>{mrn.error}</span>}
        </div>
        <div className={styles['apv-field-wrapper']}>
          <label className={corestyles['widget-label']}>First Name</label>
          <input type='text' placeholder='First Name' {...firstName}/>
          {firstName.touched && firstName.error && <span className={styles['apv-error-span']}>{firstName.error}</span>}
        </div>
        <div className={styles['apv-field-wrapper']}>
          <label className={corestyles['widget-label']}>Last Name</label>
          <input type='text' placeholder='Last Name' {...lastName}/>
          {lastName.touched && lastName.error && <span className={styles['apv-error-span']}>{lastName.error}</span>}
        </div>
        <div className={styles['apv-field-wrapper']}>
          <label className={corestyles['widget-label']}>Date of Birth</label>
          <input type='dateTime' placeholder='DOB' {...dob}/>
          {dob.touched && dob.error && <span className={styles['apv-error-span']}>{dob.error}</span>}
        </div>
        <div className={styles['apv-field-wrapper']}>
          <label className={corestyles['widget-label']}>Email</label>
            <input type='email' placeholder='Email' {...email}/>
          {email.touched && email.error && <span className={styles['apv-error-span']}>{email.error}</span>}
        </div>
        <div className={styles['apv-field-wrapper']}>
          <label className={corestyles['widget-label']}>Phone</label>
          <input type='text' placeholder='Phone' {...phone}/>
          {phone.touched && phone.error && <span className={styles['apv-error-span']}>{phone.error}</span>}
        </div>
        <div className={styles['apv-field-wrapper']}>
          <label>Gender</label>
          <div>
            <label className={corestyles['widget-label']}>
              <input type='radio' {...gender} value='M' checked={gender.value === 'M'}/> Male
            </label>
            <label className={corestyles['widget-label']}>
              <input type='radio' {...gender} value='F' checked={gender.value === 'F'}/> Female
            </label>
          </div>
          {gender.touched && gender.error && <span className={styles['apv-error-span']}>{gender.error}</span>}
        </div>
        <div className={styles['apv-field-wrapper']}>
          <label className={corestyles['widget-label']}>Tumor Type</label>
          <select
            {...tumorType}
            value={tumorType.value || ''}  // required syntax for reset form to work
                                               // undefined will not change value to first empty option
                                               // when resetting
            >
            <option></option>
            <option value='PROSTATE'>Prostate</option>
            <option value='CNS'>CNS</option>
            <option value='BREAST'>Breast</option>
          </select>
          {tumorType.touched && tumorType.error && <span className={styles['apv-error-span']}>{tumorType.error}</span>}
        </div>
        <div>
          <label>
            <input type='checkbox' {...surgical}/> Surgical
          </label>
        </div>
        <div className={styles['apv-field-wrapper']}>
          <label className={corestyles['widget-label']}>Address</label>
          <textarea
            {...address}
            value={address.value || ''} // required for reset form to work (only on textareas)
                                      // see: https://github.com/facebook/react/issues/2533
          />
          {address.touched && address.error && <span className={styles['apv-error-span']}>{address.error}</span>}
        </div>
        <div>
          <button type='submit' disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type='button' disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'addPatient',
  fields,
  validate
})(AddPatientView));
