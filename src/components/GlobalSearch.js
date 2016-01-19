import React, { Component } from 'react';
import styles from './GlobalSearch.scss';

export default class GlobalSearch extends Component {
  constructor () {
    super();
    this.somefield = 'hello';

    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleOnBlur () {
    console.log('left search input');
    // alert(this.somefield);
  }

  render () {
    return (
      <div className={styles['gs-input-wrapper']}>
        <input
          placeholder={this.props.placeholder}
          className={styles['gs-input']}
          onKeyPress={() => {
          //  alert('poo');\
            console.log('typing');
          }
        }
          onBlur={this.handleOnBlur}
        />
        <div className={styles['gs-result-container']}>
        </div>
      </div>
    );
  };
};

GlobalSearch.propTypes = {
  icon: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  styles: React.PropTypes.object
};
