import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ac from '../../state/actionCreators';
import definitions from '../../models/';

class DataList extends React.Component {
  
  componentDidMount() {
    const { dispatch, params: { table } } = this.props;
    dispatch(ac.readAll({ table }));
  }
  
  render() {
    const { data, collumns, params: { table } } = this.props;
    
    let headersDone;
    const headers = [];
    const rows = [];
    
    const tableStyle = {
      width: '100%',
      borderSpacing: 15,
      borderCollapse: 'collapse',
    };
    
    const tStyle = {
      border: 'solid thin',
      height: 20,
    };
    
    for (let id in data) {
      const obj = data[id];
      const row = [];
      
      for (let col in collumns) {
        if (!headersDone) headers.push(<th key={col}>{ col }</th>);
        
        row.push(<td key={col}>
          <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/data/explore/${table}/${id}`}>
            { obj[col] }
          </Link>
        </td>);
      }
      
      rows.push(<tr style={tStyle} key={id}>{ row }</tr>);
      headersDone = true;
    }
    
    
    return <div>
      <h3>{ table }</h3>
      <Link to='/data/explore'>Back</Link>
      
      <table style={tableStyle}>
        <thead><tr style={tStyle}>{ headers }</tr></thead>
        <tbody>{ rows }</tbody>
      </table>
    </div>;
  }
}

function mapState (state, ownProps) {
  let collumns;
  const x = ownProps.params.table;
  
  for (let model in definitions) {
    if (definitions[model].pluralName === x) collumns = definitions[model].collumns;
  }
  
  return { data: state[x], collumns };
}

export default connect(mapState)(DataList);
