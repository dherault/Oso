import React from 'react';
import { connect } from 'react-redux';
import ac from '../state/actionCreators';
import key from '../client/vendor/keymaster';
import Stats from '../client/vendor/stats'; 

class Sidebar extends React.Component {
  
  constructor() {
    super();
    this.state = {
      visible: true,
    };
  }
  
  componentDidMount() {
    key('alt+A', () => this.setState({ visible: !this.state.visible }));
    
    const stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = '9999';
    
    this.refs.statsNode.appendChild(stats.domElement);
    const update = () => {
      stats.begin();
      // monitored code goes here
      stats.end();
      window.requestAnimationFrame(update);
    };
    window.requestAnimationFrame(update);

  }
  
  handleClick(id) {
    this.props.dispatch(ac.toogleObject3D(id));
  }
  
  renderObjectsInfo() {
    const { object3Ds } = this.props;
    const s1 = {
      borderBottom: '1px solid LightGrey'
    };
    
    return Object.keys(object3Ds).map(key => {
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
    });
  }
  
  renderCameraInfo() {
    const { camera: { position: { x, y, z }, near, far } } = this.props;
    const sCamera = {
      marginBottom: 5
    };
    
    return <div style={sCamera}>
      <div><strong>{ 'Camera' }</strong></div>
      <div>{ `X: ${x}` }</div>
      <div>{ `Y: ${y}` }</div>
      <div>{ `Z: ${z}` }</div>
      <div>{ `Near: ${near}, Far: ${far}` }</div>
    </div>;
  }
  
  render() {
    const s0 = {
      visibility: this.state.visible ? 'visible' : 'hidden',
      position: 'fixed',
      top: 0,
      right: 0,
      width: '20%',
      height: '100%',
      zIndex: 1000,
      backgroundColor: '#fff',
      padding: '5px 0 0 5px',
    };
    
    
    
    return <div style={s0}>
      <div ref='statsNode' />
      { this.renderCameraInfo() }
      { this.renderObjectsInfo() }
    </div>;
  }
}

const mapState = s => ({ 
  object3Ds: s.object3Ds,
  camera: s.camera,
});

export default connect(mapState)(Sidebar);
