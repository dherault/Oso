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
      const intention = type.substr(8); // --> REQUEST || SUCCESS || FAILURE || foo
      if (type.match(/REQUEST/)) needsResolving.push(intention);
      else if (type.match(/SUCCESS|FAILURE/)) needsResolving.splice(needsResolving.indexOf(intention), 1); 
    });
    
    this.setState({ loadings: needsResolving });
  }
  
  render() {
    const divStyle = {
      width: 'auto',
      height: 'auto',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '1000',
      fontSize: '1.2rem',
      fontWeight: '700',
      color: '#FF6600'
    };
    
    return (
      <div style={divStyle}>
        { this.state.loadings.map(loading => <div key={loading}>{loading}</div>) }
      </div>
    );
  }
}
