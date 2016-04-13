import React, {Component} from 'react';
import { FormattedDate } from 'react-intl';
import styles from './RTList.scss';

export default class RTList extends Component {

  render () {
    const radiotherapy_rows = this.props.data.map((r) => {
      var rowClass = (r.id === this.props.selectedRTId) ? 'rtActive' : '';

      return (
        <tr key={r.id} className={rowClass}>
          <td>
            <FormattedDate
              value={Date(r.start)}
              day='numeric'
              month='short'
              year='numeric'
            />
          </td>
          <td>
            <FormattedDate
              value={Date(r.end)}
              day='numeric'
              month='short'
              year='numeric'
            />
          </td>
          <td>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                this.props.handleDetailViewClick(r.id);
              }}
              >
                View
            </a>
          </td>
        </tr>
      );
    });

    return (
      <table className={styles.rtList}>
        <thead>
          <tr>
            <th>Treatment Start</th>
            <th>Treatment End</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {radiotherapy_rows}
        </tbody>
      </table>
    );
  };
};

RTList.propTypes = {
  data: React.PropTypes.array,
  handleDetailViewClick: React.PropTypes.func,
  selectedRTId: React.PropTypes.number,
};
