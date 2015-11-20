import React from 'react';
import definitions from '../../models/';
import { Link } from 'react-router';

export default class DataExplorer extends React.Component {
  
  render() {
    
    const tables = Object.keys(definitions);
    
    return <div>
      <h2>Data Explorer</h2>
      
      { 
      this.props.children || <ul> 
        { 
        tables.map(table => <li key={table}>
          <Link to={'/data/explore/' + table}>{ table }</Link>
        </li>) 
        } 
      </ul>
      }
      
    </div>;
  }
}
