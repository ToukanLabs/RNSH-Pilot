import React from 'react';
import { Route, IndexRoute } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout';
import HomeView from 'views/HomeView';
import PatientView from 'views/PatientView';
import PatientOverviewView from 'views/PatientOverviewView';
import UnderMaintenanceView from 'views/UnderMaintenanceView';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='patient/:id' component={PatientView}>
      <IndexRoute component={PatientOverviewView} />
      <Route path='background-history' component={UnderMaintenanceView} />
      <Route path='pathology' component={UnderMaintenanceView} />
      <Route path='imaging' component={UnderMaintenanceView} />
      <Route path='mdt' component={UnderMaintenanceView} />
      <Route path='blood-test' component={UnderMaintenanceView} />
      <Route path='surgery' component={UnderMaintenanceView} />
      <Route path='chemotherapy' component={UnderMaintenanceView} />
      <Route path='radiotherapy' component={UnderMaintenanceView} />
      <Route path='follow-up' component={UnderMaintenanceView} />
      <Route path='questionnaires' component={UnderMaintenanceView} />
      <Route path='vte' component={UnderMaintenanceView} />
      <Route path='bevacizumab' component={UnderMaintenanceView} />
    </Route>
  </Route>
);
