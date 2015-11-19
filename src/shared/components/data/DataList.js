import React from 'react';

export default class DataList extends React.Component {
  
  render() {
    return <div>
      <h3>{ this.props.params.table }</h3>
      
    </div>;
  }
}
