import React from 'react';
import { connect } from 'react-redux';

import definitions from '../../models/';
import ac from '../../state/actionCreators';
import { capitalize } from '../../utils/text';

class DataCreator extends React.Component {
  
  constructor() {
    super();
    const inputs = {};
    const modelList = [];
    
    for (let model in definitions) {
      modelList.push(model);
      inputs[model] = {};
    }
    
    const currentModel = definitions[modelList[0]];
    
    this.state = { 
      modelList, currentModel, inputs,
      goodToGo: false,
    };
  }
  
  handleModelChange(e) {
    this.setState({ currentModel: definitions[e.currentTarget.value] }, this.validate);
  }
  
  handleInputChange(col, e) {
    const { inputs, currentModel } = this.state;
    const newInputs = Object.assign({}, inputs);
    newInputs[currentModel.name][col] = e.currentTarget.value;
    
    this.setState({ inputs: newInputs }, this.validate);
  }
  
  handleSubmit() {
    const { dispatch } = this.props;
    const { currentModel: { name }, inputs, goodToGo } = this.state;
    
    if (goodToGo) dispatch(ac['create' + capitalize(name)](inputs[name]));
  }
  
  validate() {
    const { inputs, currentModel: { name, collumns } } = this.state;
    const params = inputs[name];
    
    for (let col in collumns) {
      const value = params[col];
      const { type, required, computed, min, max } = collumns[col];
      
      if ((!computed && required && !value) || (value && type === 'string' && ((min && min > value.length) || (max && max < value.length)))) return this.setState({ goodToGo: false });
    }
    
    this.setState({ goodToGo: true });
  }
  
  renderForm() {
    
    const { currentModel: { name, collumns }, inputs } = this.state;
    const currentInputs = inputs[name];
    
    return Object.keys(collumns).map(col => {
      const { type, required, computed, min, max, ref } = collumns[col];
      
      if (computed) return;
      
      let control;
      switch (type) {
        
        case 'string':
        case 'string/email':
          control = <input type='text' value={currentInputs[col]} onChange={this.handleInputChange.bind(this, col)} />;
          break;
          
        case 'string/id':
          // todo ?
          break;
        
        default:
          return;
      }
      
      const infoRequired = required ? <span style={{color: 'red'}}> * </span> : undefined;
      const infoValidation = !min && !max ? undefined :
        min && max ? <span>{` (min: ${min}, max: ${max})`}</span> :
        min ? <span>{` (min: ${min})`}</span> : <span>{` (max: ${max})`}</span>;
        
      return <div key={col}>
        <br/>
        <span>{col + ': '}</span>
        { control } { infoRequired } { infoValidation }
      </div>;
    });
  }
  
  render() {
    
    const { modelList, selectedModel, goodToGo } = this.state;
    
    return <div>
      <h2>Data creator</h2>
      
      <div>
        <span>What do you want to create? </span>
        <select value={selectedModel} onChange={this.handleModelChange.bind(this)}>
        {
          modelList.map(m => <option key= {m} value={m}>{m}</option>)
        }
        </select>
      </div>
      
      { this.renderForm() }
      
      <br />
      <input type='button' onClick={this.handleSubmit.bind(this)} value='Create' disabled={!goodToGo}/>
    </div>;
  }
}

export default connect()(DataCreator);
