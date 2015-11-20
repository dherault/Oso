import React from 'react';
import definitions from '../../models/';
import { connect } from 'react-redux';
import ac from '../../redux/actionCreators';
import { capitalize } from '../../utils/text';
// import actionCreators from '../../redux/actionCreators';

class DataCreator extends React.Component {
  
  constructor() {
    super();
    const inputs = {};
    const modelList = [];
    
    for (let modelName in definitions) {
      modelList.push(modelName);
      inputs[modelName] = {};
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
    const currentInputs = Object.assign({}, inputs);
    currentInputs[currentModel.name][col] = e.currentTarget.value;
    
    this.setState({ inputs }, this.validate);
  }
  
  handleSubmit() {
    const { dispatch } = this.props;
    const { currentModel: { name }, inputs, goodToGo } = this.state;
    const creatorName = 'create' + capitalize(name);
    
    if (goodToGo) dispatch(ac[creatorName].create(inputs[name]));
  }
  
  validate() {
    const { inputs, currentModel: { name, collumns } } = this.state;
    
    const params = inputs[name];
    
    for (let col in collumns) {
      const { type, required, computed, min, max } = collumns[col];
      const value = params[col];
      if ((!computed && required && !value) || (value && type === 'string' && ((min && min > value.length) || (max && max < value.length)))) return this.setState({ goodToGo: false });
    }
    
    this.setState({ goodToGo: true });
  }
  
  renderForm() {
    
    const { currentModel, inputs } = this.state;
    const currentInputs = inputs[currentModel.name];
    const currentCollumns = currentModel.collumns;
    
    return Object.keys(currentCollumns).map(col => {
      const { type, required, computed, min, max } = currentCollumns[col];
      
      if (computed) return;
      
      let control;
      switch (type) {
        
        case 'email':
        case 'string':
          control = <input type='text' value={currentInputs[col]} onChange={this.handleInputChange.bind(this, col)} />;
          break;
        
        default:
          return;
      }
      
      let info1 = required ? <span style={{color: 'red'}}> * </span> : undefined;
      let info2 = !min && !max ? undefined :
        min && max ? <span>{` (min: ${min}, max: ${max})`}</span> :
        min ? <span>{` (min: ${min})`}</span> : <span>{` (max: ${max})`}</span>;
        
      return <div key={col}>
        <br/>
        <span>{col + ': '}</span>
        { control }
        { info1 }
        { info2 }
      </div>;
    });
  }
  
  render() {
    
    const { modelList, selectedModel, inputs, goodToGo } = this.state;
    
    return <div>
      <h2>Data creator</h2>
      
      { JSON.stringify(inputs) }
      
      <div>
        <span>What do you want to create? </span>
        <select value={selectedModel} onChange={this.handleModelChange.bind(this)}>
        {
          modelList.map(m => <option key= {m} value={m}>{m}</option>)
        }
        </select>
      </div>
      
      { this.renderForm() }
      
      <input type='button' onClick={this.handleSubmit.bind(this)} value='Create' disabled={!goodToGo}/>
    </div>;
  }
}

export default connect()(DataCreator);
