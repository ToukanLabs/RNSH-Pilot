import React from 'react';
import { createDevTools } from 'redux-devtools';
import FilterMonitor from 'redux-devtools-filter-actions';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q' >
    <FilterMonitor blacklist={['UPDATE_SEARCH_STRING', 'redux-form/CHANGE', 'redux-form/BLUR', 'redux-form/FOCUS']}>
      <LogMonitor />
    </FilterMonitor>
  </DockMonitor>
);
