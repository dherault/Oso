import React from 'react';

export default class LoadingBar extends React.Component {
  
  constructor() {
    super();
    this.state = { loadings: [] };
  }
  
  componentWillReceiveProps(nextProps) {
    let needsResolving = [];
    
    // Runs through each records (really not perf)
    nextProps.records.forEach(record => {
      const { type } = record;
      let intention = type.split('_');
      intention = intention.slice(1, intention.length).join('_'); // SUCCESS_CREATE_FOO -> CREATE_FOO
      if (type.match(/^(REQUEST|START)/)) needsResolving.push(intention);
      else if (type.match(/^(SUCCESS|FAILURE)/)) needsResolving.splice(needsResolving.indexOf(intention), 1); 
    });
    
    this.setState({ loadings: needsResolving });
  }
  
  render() {
    const divStyle = {
      width: 'auto',
      height: 'auto',
      position: 'fixed',
      right: '0',
      top: '0',
      zIndex: '1000',
      fontSize: 20,
      fontWeight: '700',
      color: '#FF6600'
    };
    
    return (
      <div style={divStyle}>
        { this.state.loadings.map(loading => <div key={loading + Math.random()}>{loading}</div>) }
      </div>
    );
  }
}
