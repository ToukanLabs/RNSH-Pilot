import React from 'react';
import styles from '../styles/core.scss';
import GlobalHeader from 'components/GlobalHeader';
var pjson = require('../../package.json');

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Statelesss Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of it's props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
    <div className={styles['page-container']}>
      <div className={styles['app-menu']}>
        <GlobalHeader/>
      </div>
      <div className={styles['view-container']}>
        {children}
      </div>
      <span style={{position: 'fixed', right: 2, bottom: 2, color: '#aaa', fontSize: '0.7em'}}>v{pjson.version}</span>
    </div>
  );
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
};

export default CoreLayout;
