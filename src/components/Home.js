import React from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component {

  render() {
    const s0 = {
      margin: '10% auto 0 auto',
      textAlign: 'center',
    };
    const s1 = {
      fontSize: '2rem',
      textDecoration: 'none'
    };
    
    return <div>
      <div style={s0}>
        <Link to='/~' style={s1}>Go !</Link>
      </div>
    </div>;
  }
}
