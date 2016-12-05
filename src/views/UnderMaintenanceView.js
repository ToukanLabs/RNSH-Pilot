import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  routerPath: state.router.path
});

class PatientView extends React.Component {

  render () {
    const divStyle = {
      textAlign: 'center'
    };
    const h1Style = {
      fontSize: '2em'
    };
    const imgStyle = {
      marginTop: '2em'
    };
    return (
      <div style={divStyle}>
        <img
          src={'/img/um_0' + parseInt((((Math.random() * 100) % 5) + 1), 10) + '.png'}
          style={imgStyle}
          />
        <h1 style={h1Style}>Under Construction</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PatientView);

PatientView.propTypes = {
  routerPath: React.PropTypes.string
};
