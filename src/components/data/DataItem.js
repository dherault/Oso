import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ac from '../../state/actionCreators';
import definitions from '../../models/';

class DataItem extends React.Component {
  
  componentDidMount() {
  }
  
  render() {
    const { table, id } = this.props.params;
    let [x, y, z] = [[], [], []];
    
    for (let def in definitions) {
      
      const { pluralName, collumns, hasMany, hasAndBelongToMany } = definitions[def];
      
      if (pluralName === table) {
        const data = this.props[table][id];
        
        for (let col in collumns) {
          if (collumns[col].type === 'id') x.push(<div key={col}><Link to="/">{ `${col}: ${data[col]}` }</Link></div>);
          else x.push(<div key={col}>{ `${col}: ${data[col]}` }</div>);
        }
        
        if (hasMany) y = hasMany.map(model => {
          console.log(model)
          const table = definitions[model].pluralName;
          
          return <div>{ table }</div>;
        });
        
        if (hasAndBelongToMany) z = hasAndBelongToMany.map(model => {
          const table = definitions[model].pluralName;
          
          return <div>{ table }</div>;
        });
      }
    }
    
    return <div>
      <h3>{ table + ' - ' + id }</h3>
      <Link to={'/data/explore/' + table}>Back</Link>
      
      <br />
      { 'Info' }
      { x }
      <br />
      { 'Has many' }
      { y }
      <br />
      { 'Has and belongs to many' }
      { z }
      
    </div>;
  }
}

export default connect(s => s)(DataItem);
