import React from 'react';
import { Link } from 'react-router';

export default class NotFound extends React.Component {
  
  render() {
    return <div>
      <div style={{textAlign: 'center'}}>
        <Link to='/'>Home</Link>
      </div>
      <div style={{
        marginTop: '10%',
        fontSize: '30rem',
        width: '100%',
        textAlign: 'center',
      }}>
        404
      </div>
    </div>;
  }
}
