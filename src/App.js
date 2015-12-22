import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncReduxAndRouter } from 'redux-simple-router';
import routes from './routes';
import Root from './containers/Root';
import configureStore from './redux/configureStore';

window.__INITIAL_STATE__ = {
  graphs: [
    {
      'name': 'psa',
      'displayName': 'PSA',
      'type': 'line',
      'yAxisLabel': 'ng / mL',
      'data': [
        { 'date': '29-Nov-06', 'data': 2.37 },
        { 'date': '09-Nov-10', 'data': 4.42 },
        { 'date': '21-Jan-11', 'data': 5.18 },
        { 'date': '21-Feb-12', 'data': 11 },
        { 'date': '01-Jul-12', 'data': 1.6 },
        { 'date': '09-Sep-13', 'data': 0.1 },
        { 'date': '23-Feb-15', 'data': 0.1 }
      ]
    },
    {
      'name': 'testosterone',
      'displayName': 'Testosterone',
      'type': 'line',
      'yAxisLabel': 'nmol / L',
      'data': [
        { 'date': '29-Nov-06', 'data': 6.4 },
        { 'date': '09-Nov-10', 'data': 3.0 },
        { 'date': '21-Jan-11', 'data': 1.2 },
        { 'date': '21-Feb-12', 'data': 2.4 },
        { 'date': '01-Jul-12', 'data': 4.8 },
        { 'date': '09-Sep-13', 'data': 5.5 },
        { 'date': '23-Feb-15', 'data': 6.3 }
      ]
    },
    {
      'name': 'androgen',
      'displayName': 'Androgen',
      'type': 'timeline',
      'data': [
        { 'start': '24-Jul-12', 'end': '24-Jan-13' }
      ]
    },
    {
      'name': 'radiotherapy',
      'displayName': 'Radiotherapy',
      'type': 'timeline',
      'data': [
        { 'start': '04-Sep-12', 'end': '23-Nov-12' }
      ]
    },
    {
      'name': 'surgery',
      'displayName': 'Surgery',
      'type': 'point',
      'data': [
        { 'date': '14-May-12', 'hoverTitle': 'Prostatectomy' }
      ]
    }
  ]
};

const history = createBrowserHistory();
const store = configureStore(window.__INITIAL_STATE__);

syncReduxAndRouter(history, store, (state) => state.router);

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
