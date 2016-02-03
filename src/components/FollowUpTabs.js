import React, { Component } from 'react';
import { FormattedDate, FormattedRelative } from 'react-intl';
import styles from './FollowUpTabs.scss';
import corestyles from '../styles/core.scss';

export default class FollowUpTabs extends Component {
  render () {
    const followUpTabs = () => {
      return this.props.followUps.map((fu) => {
        let className;
        if (this.props.activeFollowUp && fu.id === this.props.activeFollowUp.id) {
          className = corestyles['active'];
        }
        return (
          <li key={fu.id} className={className}>
            <a href='#' onClick={() => {
              this.props.handleFollowUpOnClick(fu.id, fu.date);
            }}>
              <FormattedDate
              value={Date.parse(fu.date)}
              format='short'
              />
            </a>
            <div className={styles['fuv-follow-up-date-relative']}>
              <FormattedRelative value={Date.parse(fu.date)} />
            </div>
          </li>
        );
      });
    };

    return (
      <ol className={corestyles['tabs']}>
        <li
          key='newFU'
          className={styles['fuv-follow-up-add']}
          onClick={this.props.handleNewFollowUpOnClick}
          >
          +
          <div className={styles['fuv-follow-up-date-relative']}>
            New
          </div>
        </li>
        {followUpTabs()}
      </ol>
    );
  };
};

FollowUpTabs.propTypes = {
  followUps: React.PropTypes.array,
  activeFollowUp: React.PropTypes.object,
  handleFollowUpOnClick: React.PropTypes.func,
  handleNewFollowUpOnClick: React.PropTypes.func,
};
