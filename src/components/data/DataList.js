import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ac from '../../state/actionCreators';

class DataList extends React.Component {
  
  componentDidMount() {
    const { dispatch, data, params: { table } } = this.props;
    
    // console.log(ac)
    dispatch(ac.readAll({ table }));
  }
  
  render() {
    const { data, params: { table } } = this.props;
    
    let headersDone;
    const headers = [];
    const rows = [];
    
    const tableStyle = {
      width: '100%',
      borderSpacing: 5,
    };
    
    const tStyle = {
      border: '1px solid cyan'
    };
    
    for (let id in data) {
      const obj = data[id];
      const row = [];
      
      for (let key in obj) {
        if (!headersDone) headers.push(<th style={tStyle} key={key}>{ key }</th>);
        
        row.push(<td style={tStyle} key={key}>
          <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/data/explore/${table}/${id}`}>
            { obj[key] }
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
        <thead><tr>{ headers }</tr></thead>
        <tbody>{ rows }</tbody>
      </table>
    </div>;
  }
}

const mapState = (state, ownProps) => {
  const x = ownProps.params.table;
  
  return { data: state[x] };
};

export default connect(mapState)(DataList);
