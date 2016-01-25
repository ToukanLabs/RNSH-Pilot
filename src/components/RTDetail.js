import React, {Component} from 'react';
import { DateTimeInput, Select, TextInput, InlineWidgetGroup } from './widgets';
import styles from './RTDetail.scss';

export default class RTDetail extends Component {

  render () {
    console.log('detail here');
    console.log(this.props.data);
    if (this.props.RTDetailViewId) {
      return (
        <div>Dose: {this.props.data.dose}</div>
      );
    } else {
      return (
        <h3>Select a radiotherapy treatment period.</h3>
      );
    }
  };
};

RTDetail.propTypes = {
  data: React.PropTypes.object,
  RTDetailViewId: React.PropTypes.string
};
