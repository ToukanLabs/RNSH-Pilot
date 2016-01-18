import React, { Component } from 'react';
import styles from 'components/SideMenu.scss';
import SideMenuItem from 'components/SideMenuItem';
import Icon from './Icon';

export default class SideMenu extends Component {
  render (visibility) {
    var menuHeader = () => {
      if (this.props.sidemenuVisibility === 'expanded') {
        return (
          <div className={styles['sm-header']}>
            <h3>Menu</h3>
            <span
              className={styles['hide-menu-icon']}
              onClick={this.props.hideSideMenu}
              >
              Hide
            </span>
          </div>
        );
      } else {
        return (
          <div className={styles['sm-header']}>
            <h3>Menu</h3>
            <span
              className={styles['hide-menu-icon']}
              onClick={this.props.showSideMenu}
              >
              Show
            </span>
          </div>
        );
      }
    };

    var showText = () => {
      return this.props.sidemenuVisibility === 'expanded';
    };

    return (
      <div id='sidemenu' className={styles['sm-' + this.props.sidemenuVisibility]}>
        {menuHeader()}
        <div className={styles['sm-content']}>
          <ul>
            <li className={styles['sm-spacer']} />
            <SideMenuItem
              text='Patient Overview'
              icon='eye'
              linkTo={`/patient/${this.props.patientId}`}
              currentRouterPath={this.props.routerPath}
              showText={showText()}
              />
            <SideMenuItem
              text='Background History'
              icon='history'
              linkTo={`/patient/${this.props.patientId}/background-history`}
              currentRouterPath={this.props.routerPath}
              showText={showText()}
              />
            <SideMenuItem
              text='Pathology'
              icon='user-md'
              linkTo={`/patient/${this.props.patientId}/pathology`}
              currentRouterPath={this.props.routerPath}
              showText={showText()}
              />
            <SideMenuItem
              text='Imaging'
              icon='heartbeat'
              linkTo={`/patient/${this.props.patientId}/imaging`}
              currentRouterPath={this.props.routerPath}
              showText={showText()}
              />
            <SideMenuItem
              text='MDT'
              icon='comments'
              linkTo={`/patient/${this.props.patientId}/mdt`}
              currentRouterPath={this.props.routerPath}
              showText={showText()}
              />
            <SideMenuItem
              text='Blood Test'
              icon='stethoscope'
              linkTo={`/patient/${this.props.patientId}/blood-test`}
              currentRouterPath={this.props.routerPath}
              showText={showText()}
              />
            <SideMenuItem
              text='Surgery'
              icon='ambulance'
              linkTo={`/patient/${this.props.patientId}/surgery`}
              currentRouterPath={this.props.routerPath}
              showText={showText()}
              />
            <SideMenuItem
              text='Chemotherapy'
              icon='balance-scale'
              linkTo={`/patient/${this.props.patientId}/chemotherapy`}
              currentRouterPath={this.props.routerPath}
              showText={showText()}
              />
            <SideMenuItem
              text='Radiotherapy'
              icon='bed'
              linkTo={`/patient/${this.props.patientId}/radiotherapy`}
              currentRouterPath={this.props.routerPath}
              showText={showText()}
              />
            <SideMenuItem
              text='Follow Up'
              icon='smile-o'
              linkTo={`/patient/${this.props.patientId}/follow-up`}
              currentRouterPath={this.props.routerPath}
              showText={showText()}
              />
            <SideMenuItem
              text='Questionnaires'
              icon='question-circle'
              linkTo={`/patient/${this.props.patientId}/questionnaires`}
              currentRouterPath={this.props.routerPath}
              showText={showText()}
              />
            <SideMenuItem
              text='VTE'
              icon='cubes'
              linkTo={`/patient/${this.props.patientId}/vte`}
              currentRouterPath={this.props.routerPath}
              showText={showText()}
              />
            <SideMenuItem
              text='Bevacizumab'
              icon='bug'
              linkTo={`/patient/${this.props.patientId}/bevacizumab`}
              currentRouterPath={this.props.routerPath}
              showText={showText()}
              />
            <li className={styles['sm-spacer']} />
          </ul>
        </div>
      </div>
    );
  }
};

SideMenu.propTypes = {
  routerPath: React.PropTypes.string,
  patientId: React.PropTypes.number,
  hideSideMenu: React.PropTypes.func,
  showSideMenu: React.PropTypes.func,
  sidemenuVisibility: React.PropTypes.string
};
