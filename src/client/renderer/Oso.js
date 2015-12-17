import _ from "three";
import log from '../../utils/log';
import ac from '../../state/actionCreators';
import config from './config';
// import sceneSets from './sceneSets';
// import MapControls from './controls/MapControls';
import WorldControls from './controls/WorldControls';
// import createEarth from './meshBuilders/earth';
// import createGalaxy from './meshBuilders/galaxy';
import createTerrain from './meshBuilders/terrain';
import createGriddedPlane from './meshBuilders/griddedPlane';
// import createEarthLines from './meshBuilders/earthLines';
// import createSimpleCube from './meshBuilders/simpleCube';
import createAvatarCube from './meshBuilders/avatarCube';
import createOrigin from './meshBuilders/origin';
import createAmbientWhite from './lightBuilders/ambientWhite';
import createSunny from './lightBuilders/sunny';

const hx = 4;

export default class Oso {
  
  constructor(store) {
    
    const d = new Date().getTime();
    this.time = d;
    this.previousTime = d;
    
    this.store = store;
    this.state = this.store.getState();
    this.previousState = this.state;
    this.store.subscribe(this.updateState.bind(this));
    
    this.height = window.innerHeight - hx;
    this.width = window.innerWidth;
    window.onresize = this.handleResize.bind(this);
    
    this.renderer = new _.WebGLRenderer({ antialias	: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    
    this.camera = new _.PerspectiveCamera(45, this.width / this.height); // fov and aspect are not controlled by the state
    this.camera.up = new _.Vector3(0, 0, 1);
    
    this.scene = new _.Scene();
		this.scene.add(this.camera);
		
    this.loopListeners = [];
    this.loopListeners.push(() => this.renderer.render(this.scene, this.camera));
    
    // Map
    // const builders = [createGalaxy, createEarth, createEarthLines, createSunny, createAmbientWhite];
    // this.controls = new MapControls(this.camera, this.renderer.domElement, this.store);
    // World
    const builders = [createAvatarCube, /*createTerrain*/, createGriddedPlane, createSunny, createAmbientWhite, createOrigin];
    this.controls = new WorldControls(this.camera, this.renderer.domElement, this.store);
    
    // 3DObject creation
    builders.forEach(fn => this.store.dispatch(ac.createObject3D(fn(this))));
    
    this.loopListeners.push(this.updateAvatarPosition.bind(this));
  }
  
  updateState() {
    this.previousState = this.state;
    this.state = this.store.getState();
    
    const { lastAction } = this.state;
    
    switch (lastAction.type) {
    
    // case 'SET_SCENESET':
    //   this.updateScene();
    //   break;
    
    case 'SUCCESS_CREATE_OBJECT3D':
      this.scene.add(lastAction.payload);
      // if (lastAction.payload.name === 'AvatarCube') {
        
      // }
      break;
      
    // case 'ADD_OBJECT3D':
    //   this.scene.add(lastAction.payload);
    //   break;
    
    case 'SET_CAMERA_POSITION':
			this.camera.position.copy(this.state.camera.position);
			this.camera.lookAt(this.state.avatar.position);
			this.camera.updateProjectionMatrix();
			break;
    
    case 'UPDATE_AVATAR_POSITION':
			this.camera.position.copy(this.state.camera.position);
			this.camera.lookAt(this.state.avatar.position);
			this.camera.updateProjectionMatrix();
			this.scene.getObjectByName('Avatar').position.copy(this.state.avatar.position);
			break;
    }
  }
  
  updateAvatarPosition() {
    const { forward, backward, left, right } = this.state.avatar.movement;
    
    if (!(forward || backward || left || right)) return;
    
    const f = forward && forward > backward;
    const b = backward && forward < backward;
    const l = left && left > right;
    const r = right && left < right;
    
    const angle = f && l ? Math.PI / 4 :
      f && r ? -Math.PI / 4 :
      b && l ? 3 * Math.PI / 4 :
      b && r ? -3 * Math.PI / 4 :
      f ? 0 :
      b ? -Math.PI :
      l ? Math.PI / 2 : -Math.PI / 2;
    
    const avatarPosition = this.state.avatar.position.clone();
    const cameraPosition = this.state.camera.position.clone();
    const delta = new _.Vector3()
      .subVectors(avatarPosition, cameraPosition)
      .setZ(0)
      .applyAxisAngle(new _.Vector3(0, 0, 1), angle)
      .setLength(0.1);
      
    this.store.dispatch(ac.updateAvatarPosition(delta));
  }
  
  loop() {
    this.animationFrameId = window.requestAnimationFrame(this.loop.bind(this));
    
    this.previousTime = this.time;
    this.time = new Date().getTime();
    this.loopListeners.forEach(fn => fn(this.state, this.time, this.time - this.previousTime));
  }
  
  start() {
    log('... Oso start');
    this.loop();
  }
  
  stop() {
    log('... Oso stop');
    window.cancelAnimationFrame(this.animationFrameId);
  }
  
  handleResize() {
    this.height = window.innerHeight - hx;
    this.width = window.innerWidth;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
}
