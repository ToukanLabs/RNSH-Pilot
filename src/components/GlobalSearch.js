import React, { Component } from 'react';
import styles from './GlobalSearch.scss';

export default class GlobalSearch extends Component {
  constructor () {
    super();
    this.modifySearchString = this.modifySearchString.bind(this);
  }

  modifySearchString (value) {
    this.props.updateSearchString(value);
  };

  render () {
    return (
      <input
        ref='searchBox'
        placeholder={this.props.placeholder}
        className={styles['gs-input']}
        onKeyUp={() => {
          this.modifySearchString(this.refs.searchBox.value);
        }
      }
        onFocus={this.props.showSearchResults}
      />
    );
  };
};

GlobalSearch.propTypes = {
  placeholder: React.PropTypes.string,
  showSearchResults: React.PropTypes.func.isRequired,
  updateSearchString: React.PropTypes.func.isRequired,
  styles: React.PropTypes.object
};
