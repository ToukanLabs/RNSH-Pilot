import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import FilterMonitor from 'redux-devtools-filter-actions';

export default createDevTools(
  <FilterMonitor blacklist={['UPDATE_SEARCH_STRING', 'redux-form/CHANGE', 'redux-form/BLUR', 'redux-form/FOCUS']}>
    <LogMonitor />
  </FilterMonitor>
);
