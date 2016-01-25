import React, {Component} from 'react';
import { connect } from 'react-redux';
import { actions as patientActions } from '../redux/modules/patient';

import RTList from 'components/RTList';
import RTDetail from 'components/RTDetail';
import styles from './RadiotherapyView.scss';

const mapStateToProps = (state) => ({
  activePatient: state.patients.activePatient,
  graphs: state.graphs
});

export class RadiotherapyView extends Component {

  getRTDetailData = () => {
    return 0;
  };

  getRTList = () => {
    var r = this.props.graphs.filter((g) => {
      if (g.name === 'radiotherapy') {
        return g;
      }
    });

    return r[0].data;
  };

  handleDetailViewClick = (id) => {
    this.props.setRTDetailViewId(id);
  };

  render () {
    return (
      <div>
        <h2>Radiotherapy</h2>
        <div className={styles['radiotherapy-rt-list']}>
          <RTList
            data={this.getRTList()}
            selectedRTId={this.props.activePatient.RTDetailViewId}
            handleDetailViewClick={this.handleDetailViewClick}
            />
        </div>
        <div className={styles['radiotherapy-rt-detail']}>
          <RTDetail data={this.getRTDetailData()} />
        </div>
      </div>
    );
  };
};

export default connect(mapStateToProps, patientActions)(RadiotherapyView);

RadiotherapyView.propTypes = {
  activePatient: React.PropTypes.object,
  graphs: React.PropTypes.array,
  setRTDetailViewId: React.PropTypes.func
};
