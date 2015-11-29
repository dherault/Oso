import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ac from '../../state/actionCreators';
import definitions from '../../models/';
import { capitalize } from '../../utils/text';

class DataItem extends React.Component {
  
  componentWillMount() {
    const { stores, readItem } = this.props;
    const { table, id } = stores.router.params;
    
    if (!stores[table][id]) readItem({ id });
  }
  
  componentWillReceiveProps({ stores }) {
    const { table, id } = stores.router.params;
    const data = stores[table][id];
    if (data) this.setState(data);
  }
  
  updateValue(col, val) {
    const { updateItem, stores: { router : { params : { id } } } } = this.props;
    updateItem({ id, [col]: val });
  };
  
  render() {
    const { dispatch, stores, collumns } = this.props;
    const { table, id } = stores.router.params;
    const data = stores[table][id];
    let x = [];
    
    if (!data) return <div>Loading...</div>;
    
    for (let col in collumns) {
      
      const { type, ref } = collumns[col];
      const value = data[col];
      
      switch(type) {
        
        case 'string':
        case 'string/email':
          x.push(<TextInput key={col} 
            col={col} 
            value={value} 
            updateValue={this.updateValue.bind(this, col)} 
          />);
          break;
        
        case 'string/id':
          const refTable = definitions[ref].pluralName;
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
          
        default:
          break;
      }
    }
    
    return <div>
      <h3>{ table + ' - ' + id }</h3>
      <Link to={'/data/explore/' + table}>Back</Link>
      
      <br />
      <br />
      <table width='100%'>
        <tbody>{ x }</tbody>
      </table>
      
    </div>;
  }
}

function mergeProps (sProps, dProps) {
  
  const { dispatch } = dProps;
  const { table } = sProps.stores.router.params;
  let collumns, readItem, updateItem;
  
  for (let model in definitions) {
    const definition = definitions[model];
    
    if (definition.pluralName === table) { 
      collumns = definition.collumns;
      readItem = params => dispatch(ac['read' + capitalize(model)](params));
      updateItem = params => dispatch(ac['update' + capitalize(model)](params));
    }
  }
  
  return Object.assign({}, sProps, dProps, { collumns, readItem, updateItem });
}

export default connect(s => ({ stores: s }), null, mergeProps)(DataItem);



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
