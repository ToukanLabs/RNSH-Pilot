import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (process.env.NODE_ENV !== 'production') {
  require('../static/css/style.css');
}

ReactDOM.render(<App />, document.getElementById('root'));
