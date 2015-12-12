import React from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import ac from '../state/actionCreators';

class GameMenu extends React.Component {

  render() {
    const { dispatch } = this.props;
    
    const s0 = {
      position: 'fixed',
      left: 0,
      bottom: 10,
      backgroundColor: '#000',
    };
    const s1 = {
      color: '#fff',
      fontSize: '1.2rem',
      margin: '5px 0 0 5px',
      textDecoration: 'none',
    };
    
    return <div style={s0}>
      <span style={s1} onClick={() => dispatch(ac.setSceneSet('map'))}>Map</span>
    </div>;
  }
}
 export default connect()(GameMenu);