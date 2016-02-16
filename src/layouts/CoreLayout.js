import React, { Component } from 'react';
import styles from '../styles/core.scss';
import Modal from '../components/Modal';
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

class CoreLayout extends Component {

  componentWillReceiveProps (nextProps) {
    // if we changed routes...
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children;
    }
  };

  render () {
    let { location } = this.props;

    let isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );

    return (
      <div className={styles['page-container']}>
        <div className={styles['app-menu']}>
          <GlobalHeader/>
        </div>
        <div className={styles['view-container']}>
          {isModal ? this.previousChildren : this.props.children}
          {isModal && (
            <Modal isOpen returnTo={location.state.returnTo} modalHeading={location.state.modalHeading}>
              {this.props.children}
            </Modal>
          )}
        </div>
        <span style={{position: 'fixed', right: 2, bottom: 2, color: '#aaa', fontSize: '0.7em'}}>v{pjson.version}</span>
      </div>
    );
  };
};

CoreLayout.propTypes = {
  children: React.PropTypes.element,
  location: React.PropTypes.object,
};

export default CoreLayout;
