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
import UnderMaintenanceView from 'views/UnderMaintenanceView';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/patient/:id' component={PatientView}>
      <Route path='/patient/:id/background-history' component={UnderMaintenanceView} />
      <Route path='/patient/:id/pathology' component={UnderMaintenanceView} />
      <Route path='/patient/:id/imaging' component={UnderMaintenanceView} />
      <Route path='/patient/:id/mdt' component={UnderMaintenanceView} />
      <Route path='/patient/:id/blood-test' component={UnderMaintenanceView} />
      <Route path='/patient/:id/surgery' component={UnderMaintenanceView} />
      <Route path='/patient/:id/chemotherapy' component={UnderMaintenanceView} />
      <Route path='/patient/:id/radiotherapy' component={UnderMaintenanceView} />
      <Route path='/patient/:id/follow-up' component={UnderMaintenanceView} />
      <Route path='/patient/:id/questionnaires' component={UnderMaintenanceView} />
      <Route path='/patient/:id/vte' component={UnderMaintenanceView} />
      <Route path='/patient/:id/bevacizumab' component={UnderMaintenanceView} />
    </Route>
  </Route>
);
