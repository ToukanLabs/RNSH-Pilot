import React from 'react';
import SideMenu from 'components/SideMenu';
import { connect } from 'react-redux';
import { actions as uiActions } from 'redux/modules/ui';

const mapStateToProps = (state) => ({
  routerPath: state.router.path,
  sidemenuVisibility: state.ui.sidemenuVisibility
});

export default class PatientView extends React.Component {
  render () {
    return (
      <div>
        <SideMenu
          routerPath={this.props.routerPath}
          patientId={parseInt(this.props.params.id, 10)}
          hideSideMenu={this.props.hideSideMenu}
          showSideMenu={this.props.showSideMenu}
          sidemenuVisibility={this.props.sidemenuVisibility}
          />
        {this.props.children}
      </div>
    );
  };
};

export default connect(mapStateToProps, uiActions)(PatientView);

PatientView.propTypes = {
  routerPath: React.PropTypes.string,
  children: React.PropTypes.element,
  params: React.PropTypes.object,
  hideSideMenu: React.PropTypes.func,
  showSideMenu: React.PropTypes.func,
  sidemenuVisibility: React.PropTypes.string
};
