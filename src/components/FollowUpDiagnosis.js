import React, { Component } from 'react';
import Panel from './Panel';
import Loading from './Loading';
import { DateTimeInput, Select, TextInput, InlineWidgetGroup } from './widgets';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as patientActions } from 'redux/modules/patient';
import styles from './FollowUpDiagnosis.scss';

const mapStateToProps = (state) => ({
  activePatient: state.patients.activePatient
});

const mapDispatchToProps = (dispatch) => {
  return {
    patientActions: bindActionCreators(patientActions, dispatch),
  };
};

export default class FollowUpDiagnosis extends Component {
  constructor () {
    super();
    this.state = {
      gsPatternOne: NaN,
      gsPatternTwo: NaN,
      gleasonScore: null,
    };
  }

  setGSPatternOne = (e) => {
    const gsPattern1Val = parseInt(e.target.value, 10);
    const gsResult = this.calculateGS(gsPattern1Val, this.state.gsPatternTwo);
    this.setState({
      ...this.state,
      gsPatternOne: gsPattern1Val,
      gleasonScore: gsResult,
    });
  };

  setGSPatternTwo = (e) => {
    const gsPattern2Val = parseInt(e.target.value, 10);
    const gsResult = this.calculateGS(this.state.gsPatternOne, gsPattern2Val);
    this.setState({
      ...this.state,
      gsPatternTwo: gsPattern2Val,
      gleasonScore: gsResult,
    });
  };

  calculateGS = (patternOne, patternTwo) => {
    let gleasonScore;
    if (!isNaN(patternOne) && !isNaN(patternTwo)) {
      gleasonScore = patternOne + patternTwo;
    } else {
      gleasonScore = null;
    }

    return gleasonScore;
  };

  componentWillMount () {
    this.props.patientActions.fetchDiagnosis(this.props.activePatient.ehrId);
  };

  componentWillUnmount () {
    if (this.props.activePatient.diagnosis) {
      this.props.patientActions.saveDiagnosis(
        this.props.activePatient.ehrId,
        this.props.activePatient.diagnosis.primary_tumour_pt,
        this.props.activePatient.diagnosis.regional_lymph_node_pn,
        this.props.activePatient.diagnosis.distant_metastasis_pm
      );
    }
  };

  handleChangePrimaryTumorPt = (e) => {
    const newVal = e.target.value;
    const diagnosis = {
      primary_tumour_pt: newVal,
      regional_lymph_node_pn: this.props.activePatient.diagnosis.regional_lymph_node_pn,
      distant_metastasis_pm: this.props.activePatient.diagnosis.distant_metastasis_pm
    };
    this.props.patientActions.updateDiagnosis(diagnosis);
  };

  handleChangeRegionalLymphNode = (e) => {
    const newVal = e.target.value;
    const diagnosis = {
      primary_tumour_pt: this.props.activePatient.diagnosis.primary_tumour_pt,
      regional_lymph_node_pn: newVal,
      distant_metastasis_pm: this.props.activePatient.diagnosis.distant_metastasis_pm
    };
    this.props.patientActions.updateDiagnosis(diagnosis);
  };

  handleChangeDistantMetastasis = (e) => {
    const newVal = e.target.value;
    const diagnosis = {
      primary_tumour_pt: this.props.activePatient.diagnosis.primary_tumour_pt,
      regional_lymph_node_pn: this.props.activePatient.diagnosis.regional_lymph_node_pn,
      distant_metastasis_pm: newVal
    };
    this.props.patientActions.updateDiagnosis(diagnosis);
  };

  render () {
    console.log('rendering FolloupDiagnosis');
    if (this.props.activePatient.diagnosis === undefined) {
      return (
        <Panel title='Diagnosis' className={styles.fudPanel}>
          <Loading/>
        </Panel>
      );
    } else {
      return (
        <Panel title='Diagnosis' className={styles.fudPanel}>
          <div className={styles.fudWidgetGroupOne}>
            <DateTimeInput label='Date of Dx' noTime mandatory />
            <InlineWidgetGroup>
              <Select
                label='TNM'
                options={[
                  {key: 'pT2', value: 'pT2'},
                  {key: 'pT3a', value: 'pT3a'},
                  {key: 'pT3b', value: 'pT3b'},
                  {key: 'pT4', value: 'pT4'},
                  {key: 'pTx', value: 'pTx'},
                ]}
                defaultValue={this.props.activePatient.diagnosis.primary_tumour_pt}
                onChange={this.handleChangePrimaryTumorPt}
                />
              <Select
                options={[
                  {key: 'pN0', value: 'pN0'},
                  {key: 'pN1', value: 'pN1'},
                  {key: 'pN2', value: 'pN2'},
                  {key: 'pNX', value: 'pNX'},
                ]}
                defaultValue={this.props.activePatient.diagnosis.regional_lymph_node_pn}
                onChange={this.handleChangeRegionalLymphNode}
                />
              <Select
                options={[
                  {key: 'MX', value: 'MX'},
                  {key: 'M0', value: 'M0'},
                  {key: 'M1', value: 'M1'},
                  {key: 'M1a', value: 'M1a'},
                  {key: 'M1b', value: 'M1b'},
                  {key: 'M1c', value: 'M1c'},
                ]}
                defaultValue={this.props.activePatient.diagnosis.distant_metastasis_pm}
                onChange={this.handleChangeDistantMetastasis}
                />
            </InlineWidgetGroup>
            <InlineWidgetGroup>
              <Select
                ref='gsPatternOne'
                label='GS'
                options={[
                  {key: '0', value: '0'},
                  {key: '1', value: '1'},
                  {key: '2', value: '2'},
                  {key: '3', value: '3'},
                  {key: '4', value: '4'},
                  {key: '5', value: '5'},
                ]}
                onChange={this.setGSPatternOne}
                />
              +
              <Select
                ref='gsPatternTwo'
                options={[
                  {key: '0', value: '0'},
                  {key: '1', value: '1'},
                  {key: '2', value: '2'},
                  {key: '3', value: '3'},
                  {key: '4', value: '4'},
                  {key: '5', value: '5'},
                ]}
                onChange={this.setGSPatternTwo}
                />
              =
              <TextInput
                ref='gsCalculated'
                type='text'
                value={this.state.gleasonScore}
                className={styles.fudGSResult}
                />
            </InlineWidgetGroup>
            <TextInput
              type='text'
              label='Cores Biopsied'
              className={styles.fudCores}
              />
            <TextInput
              type='text'
              label='Cores Involved'
              className={styles.fudCores}
              />
          </div>
          <div className={styles.fudWidgetGroupTwo}>
            <Select
              label='RadOnc'
              options={[
                {key: 'M. Back', value: 'M. Back'},
                {key: 'J. Donovan', value: 'J. Donovan'},
                {key: 'T. Eade', value: 'T. Eade'},
                {key: 'M. Holecek', value: 'M. Holecek'},
                {key: 'A. Kneebone', value: 'A. Kneebone'},
                {key: 'G. Lamoury', value: 'G. Lamoury'},
                {key: 'G. Morgan', value: 'G. Morgan'},
                {key: 'T. Shakespeare', value: 'T. Shakespeare'},
              ]}
              />
            <Select
              label='Referring Urologist'
              options={[
                {key: 'V. Chalasani', value: 'V. Chalasani'},
                {key: 'E. Lazzaro', value: 'E. Lazzaro'},
                {key: 'K. Rasiah', value: 'K. Rasiah'},
                {key: 'J. Vass', value: 'J. Vass'},
                {key: 'K. Vaux', value: 'K. Vaux'},
                {key: 'M. Wines', value: 'M. Wines'},
              ]}
              />
            <TextInput
              type='text'
              label='Referring LMO' />
          </div>
        </Panel>
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowUpDiagnosis);

FollowUpDiagnosis.propTypes = {
  patientActions: React.PropTypes.object,
  activePatient: React.PropTypes.object,
};
