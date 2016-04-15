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

  rtData = undefined;

  getRTDetailData = () => {
    var rec = this.rtData.filter((r) => {
      if (r.id === this.props.activePatient.RTDetailViewId) {
        return r;
      }
    });
    return rec[0];
  };

  getRTList = () => {
    var r = this.props.graphs.filter((g) => {
      if (g.name === 'radiotherapy') {
        return g;
      }
    });
    this.rtData = r[0].data;
    return this.rtData;
  };

  handleDetailViewClick = (id) => {
    this.props.setRTDetailViewId(id);
  };

  render () {
    return (
      <div className={styles.radiotherapyContainer}>
        <div className={styles.radiotherapyRTList}>
          <RTList
            data={this.getRTList()}
            selectedRTId={this.props.activePatient.RTDetailViewId}
            handleDetailViewClick={this.handleDetailViewClick}
            />
        </div>
        <div className={styles.radiotherapyRTDetail}>
          <RTDetail
            data={this.getRTDetailData()}
            RTDetailViewId={this.props.activePatient.RTDetailViewId}
          />
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
