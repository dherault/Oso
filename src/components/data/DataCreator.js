import React from 'react';
import definitions from './models';
import { connect } from 'react-redux';
import actionCreators from '../../redux/actionCreators';

class DataCreator extends React.Component {
  
  constructor() {
    super();
    const inputs = {};
    const modelList = [];
    
    for (let modelName in definitions) {
      const fields = definitions[modelName];
      modelList.push(modelName);
      inputs[modelName] = {};
    }
    const selectedModel = modelList[0];
    
    this.state = { 
      modelList, selectedModel, inputs
    };
  }
  
  handleModelChange(e) {
    this.setState({ selectedModel: e.currentTarget.value });
  }
  
  handleFieldChange(field, e) {
    console.log(field);
    console.log(e.currentTarget.value);
    const inputs = Object.assign({}, this.state.inputs);
    inputs[this.state.selectedModel][field] = e.currentTarget.value;
    
    this.setState({ inputs });
  }
  
  handleSubmit() {
    const { dispatch } = this.props;
    const { selectedModel, inputs } = this.state;
    dispatch(
      actionCreators['create' + selectedModel.charAt(0).toUpperCase() + selectedModel.slice(1)](
        inputs[selectedModel]
      )
    );
  }
  
  renderForm() {
    
    const { selectedModel, inputs } = this.state;
    const currentInputs = inputs[selectedModel];
    const currentFields = definitions[selectedModel];
    
    return Object.keys(currentFields).map(field => {
      const { type, required, value } = currentFields[field];
      
      let control;
      switch (type) {
        
        case 'string':
          control = <input type='text' value={currentInputs[field]} onChange={this.handleFieldChange.bind(this, field)} />;
          break;
        
        default:
          return;
      }
      
      return <div key={field}>
        <br/>
        <span>{field + ': '}</span>
        { control }
      </div>;
    });
  }
  
  render() {
    
    const { modelList, selectedModel, inputs } = this.state;
    
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
      
      <input type='button' onClick={this.handleSubmit.bind(this)} value='Create' />
    </div>;
  }
}

export default connect()(DataCreator);
