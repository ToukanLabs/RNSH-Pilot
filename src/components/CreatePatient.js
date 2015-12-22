import React, {Component} from 'react';

export default class CreatePatient extends Component {
  constructor () {
    super();
    this.savePatient = this.savePatient.bind(this);
  }

  savePatient (e) {
    e.preventDefault();
    const patientName = this.refs.patientName.value.trim();
    this.props.handleSave(patientName);
  };

  render () {
    return (
      <form>
        <input ref='patientName' placeholder='Patient Name' />
        <button onClick={this.savePatient.bind(this)}>Save</button>
      </form>
    );
  }
};

CreatePatient.propTypes = {
  handleSave: React.PropTypes.func
};
