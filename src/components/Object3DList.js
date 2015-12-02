import React from 'react';
import { connect } from 'react-redux';
import ac from '../state/actionCreators';

class Object3DList extends React.Component {
  
  handleClick(id) {
    this.props.dispatch({ type: 'TOOGLE_OBJECT3D', params: { id }});
  }
  
  render() {
    const { object3Ds } = this.props;
    const s0 = {
      position: 'fixed',
      top: 0,
      right: 0,
      width: '20%',
      height: '100%',
      zIndex: 1000,
      backgroundColor: '#fff',
    };
    
    const s1 = {
      margin: '10px 0 0 10px',
      borderBottom: '1px solid LightGrey'
    };
    
    return <div style={s0}>
      {
        Object.keys(object3Ds).map(key => {
        const { id, name, visible, position: { x, y, z } } = object3Ds[key];
        
        return <div key={key} style={s1}>
          <div><strong>{ id }</strong></div>
          <div>
            <span>{ name || 'no name' }</span>
            <span>{ ' - ' }</span>
            <span>{ `${x}, ${y}, ${z}` }</span>
            <span>{ ' - ' }</span>
            <span>{ visible ? 'visible' : 'hidden' }</span>
            <span>{ ' - ' }</span>
            <button onClick={this.handleClick.bind(this, id)}>Toogle</button>
          </div>
        </div>;
        })
      }
    </div>;
  }
}

export default connect(s => ({ object3Ds: s.object3Ds }))(Object3DList);
