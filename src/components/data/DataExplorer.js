import React from 'react';
import definitions from '../../models/';
import { Link } from 'react-router';

export default class DataExplorer extends React.Component {
  
  render() {
    
    const models = Object.keys(definitions);
    
    const links = [];
    
    for (let model in definitions) {
      const x = definitions[model].pluralName;
      links.push(<li key={x}>
        <Link to={'/data/explore/' + x}>{ x }</Link>
      </li>);
    }
    
    return <div>
      <h2>Data Explorer</h2>
      { 
        this.props.children || <ul> { links } </ul>
      }
    </div>;
  }
}
