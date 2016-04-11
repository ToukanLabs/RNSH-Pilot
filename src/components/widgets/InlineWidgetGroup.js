import React, {Component} from 'react';
import styles from './widgets.scss';

export default class InlineWidgetGroup extends Component {
  render () {
    return (
      <div className={styles.inlineWidgetGroup}>
        {this.props.children}
      </div>
    );
  }
};

InlineWidgetGroup.propTypes = {
  children: React.PropTypes.array.isRequired
};
