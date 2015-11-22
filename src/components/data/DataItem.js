import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ac from '../../state/actionCreators';
import definitions from '../../models/';
import { capitalize } from '../../utils/text';

class DataItem extends React.Component {
  
  componentWillMount() {
    const { dispatch, stores } = this.props;
    const { table, id } = stores.router.params;
    
    if (!stores[table][id]) {
      for (let def in definitions) {
        if (definitions[def].pluralName === table) dispatch(ac['read' + capitalize(def)]({ id }));
      }
    }
  }
  
  componentWillReceiveProps({ stores }) {
    const { table, id } = stores.router.params;
    const data = stores[table][id];
    if (data) this.setState(data);
  }
  
  updateValue(col, val) {
    const { dispatch, stores } = this.props;
    const { table, id } = stores.router.params;
    for (let def in definitions) {
      if (definitions[def].pluralName === table) dispatch(ac['update' + capitalize(def)]({ id, [col]: val }));
    }
  };
  
  render() {
    const { dispatch, stores } = this.props;
    const { table, id } = stores.router.params;
    const data = stores[table][id];
    let x = [];
    
    if (!data) return <div>Loading...</div>;
    
    for (let def in definitions) {
      
      const { pluralName, collumns } = definitions[def];
      
      if (pluralName === table) {
        for (let col in collumns) {
          
          const value = data[col];
          
          switch(collumns[col].type) {
            
            case 'string':
            case 'string/email':
              x.push(<TextInput key={col} 
                col={col} 
                value={value} 
                updateValue={this.updateValue.bind(this, col)} 
              />);
              break;
            
            case 'string/id':
              const refTable = definitions[collumns[col].ref].pluralName;
              const readAllRef = () => dispatch(ac.readAll({ table: refTable }));
              x.push(<IdInput key={col} 
                col={col} 
                value={value} 
                refStore={stores[refTable]}
                readAllRef={readAllRef}
                linkPath={`/data/explore/${refTable}/${value}`}
                updateValue={this.updateValue.bind(this, col)} 
              />);
              break;
              
            // case 'array/id':
            //   const refTable2 = definitions[collumns[col].ref].pluralName;
            //   x.push(<tr style={{height: 30}}>
            //     <td width='25%'><strong>{ col + ': ' }</strong></td>
                
            //     <td width='50%'> { !value ? '-' :
            //       value.map(id => <span key={id}><Link to={`/data/explore/${refTable2}/${id}`}>{ value }</Link>{ '-' }</span>)
            //     } </td>
            //   </tr>);
            //   break;
            
            default:
              break;
          }
        }
      }
    }
    
    const tableStyle = {
      width: '100%',
    };
    
    return <div>
      <h3>{ table + ' - ' + id }</h3>
      <Link to={'/data/explore/' + table}>Back</Link>
      
      <br />
      <br />
      <table style={tableStyle}>
        <tbody>{ x }</tbody>
      </table>
      
    </div>;
  }
}

export default connect(s => ({ stores: s }))(DataItem);

class TextInput extends React.Component {
  
  constructor() {
    super();
    
    this.handleInput = e => this.setState({ value: e.currentTarget.value });
    this.handleToogle = e => this.setState({ toogled: !this.state.toogled });
    this.handleSubmit = e => this.setState({ toogled: false }, () => this.props.updateValue(this.state.value));
    this.handleKeyDown = ({ keyCode }) => {
      if (keyCode === 9 || keyCode === 13) this.setState({ toogled: false }, () => this.props.updateValue(this.state.value));
    };
  }
  
  componentWillMount() {
    this.setState({ value: this.props.value, toogled: false });
  }
  
  render() {
    
    const { value, toogled } = this.state;
    const s0 = { height: 30 };
    const s1 = { display: toogled ? 'none' : 'table-cell' };
    const s2 = { display: toogled ? 'table-cell' : 'none' };
    
    return <tr style={s0}>
      <td width='25%'><strong>{ this.props.col + ': ' }</strong></td>
      
      <td width='50%' style={s1}>{ this.props.value || '-' }</td>
      <td onClick={this.handleClick} style={s1}>
        <button onClick={this.handleToogle}>Edit</button>
      </td>
      
      <td width='50%' style={s2}>
        <input type='text' value={value} onChange={this.handleInput} onKeyDown={this.handleKeyDown}/>
      </td>
      <td style={s2}>
        <button onClick={this.handleSubmit}>Update</button>
        <button onClick={this.handleToogle}>X</button>
      </td>
    </tr>;
  }
}

class IdInput extends React.Component {
  
  constructor() {
    super();
    
    this.handleInput = e => this.setState({ value: e.currentTarget.value });
    this.handleToogle = e => this.setState({ toogled: !this.state.toogled });
    this.handleSubmit = e => this.setState({ toogled: false }, () => this.props.updateValue(this.state.value));
  }
  
  componentWillMount() {
    this.setState({ value: this.props.value || '', toogled: false });
  }
  
  render() {
    
    const { col, value, refStore, readAllRef, linkPath } = this.props;
    const { toogled } = this.state;
    
    let options = [<option key={0} value={''}>{ '-' }</option>];
    
    for (let id in refStore) {
      const { pseudo, name } = refStore[id];
      options.push(<option key={id} value={id}>{ pseudo ? pseudo : name ? name : id }</option>);
    }
    
    const s0 = { height: 30 };
    const s1 = { display: toogled ? 'none' : 'table-cell' };
    const s2 = { display: toogled ? 'table-cell' : 'none' };
    
    return <tr style={s0}>
      <td width='25%'><strong>{ col + ': ' }</strong></td>
      
      <td width='50%' style={s1}>{ value ? <Link to={linkPath}>{ value }</Link> : '-' }</td>
      <td onClick={this.handleClick} style={s1}>
        <button onClick={this.handleToogle}>Edit</button>
      </td>
      
      <td width='50%' style={s2}>
        <select value={value} onChange={this.handleInput.bind(this)}>
          { options }
        </select>
        <button onClick={readAllRef}>refresh</button>
      </td>
      <td style={s2}>
        <button onClick={this.handleSubmit}>Update</button>
        <button onClick={this.handleToogle}>X</button>
      </td>
    </tr>;
  }
}

