import React from 'react';
import definitions from './models';

export default class DataCreator extends React.Component {
  
  constructor() {
    super();
    const modelList = Object.keys(definitions);
    const selectedModel = modelList[0];
    const models = (() => {
      const models = Object.assign({}, definitions);
      
      for (let model in models) {
        const fields = models[model];
        for (let field in fields) {
          fields[field].value = undefined;
        }
      }
      
      return models;
    })();
    
    this.state = { 
      modelList, selectedModel, models
    };
  }
  
  handleModelChange(e) {
    this.setState({ selectedModel: e.currentTarget.value });
  }
  
  handleFieldChange(field, e) {
    console.log(field);
    console.log(e.currentTarget.value);
    const models = Object.assign({}, this.state.models);
    models[this.state.selectedModel][field].value = e.currentTarget.value;
    
    this.setState({ models });
  }
  
  handleSubmit() {
    
  }
  
  renderForm(model) {
    
    return Object.keys(model).map(key => {
      const { type, required, value } = model[key];
      
      let control;
      switch (type) {
        
        case 'string':
          control = <input type='text' value={value} onChange={this.handleFieldChange.bind(this, key)} />;
          break;
        
        default:
          return;
      }
      
      return <div key={key}>
        <br/>
        <span>{key + ': '}</span>
        { control }
      </div>;
    });
  }
  
  render() {
    
    const { modelList, selectedModel, models } = this.state;
    
    return <div>
      <h2>Data creator</h2>
      
      { JSON.stringify(models) }
      
      <div>
        <span>What do you want to create? </span>
        <select value={selectedModel} onChange={this.handleModelChange.bind(this)}>
        {
          modelList.map(m => <option key= {m} value={m}>{m}</option>)
        }
        </select>
      </div>
      
      { this.renderForm(models[selectedModel]) }
      
      <input type='button' onClick={this.handleSubmit.bind(this)} value='Create' />
    </div>;
  }
}
