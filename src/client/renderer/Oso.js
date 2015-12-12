import _ from "three";
import log from '../../utils/log';
import ac from '../../state/actionCreators';
import config from './config';
import sceneSets from './sceneSets';
import MapControls from './controls/MapControls';
import createEarth from './meshBuilders/earth';
import createGalaxy from './meshBuilders/galaxy';
import createTerrain from './meshBuilders/terrain';
import createEarthLines from './meshBuilders/earthLines';
import createAmbientBlack from './lightBuilders/ambientBlack';
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
    this.controls = new MapControls(this.camera, this.renderer.domElement, this.store);
    
    this.scene = new _.Scene();
		this.scene.add(this.camera);
		
    this.loopListeners = [];
    this.loopListeners.push(() => this.renderer.render(this.scene, this.camera));
    
    // Map
    // const builders = [createGalaxy, createEarth, createEarthLines, createSunny, createAmbientBlack];
    // World
    const builders = [createTerrain, createSunny, createAmbientBlack];
    
    // 3DObject creation
    builders.forEach(fn => this.store.dispatch(ac.createObject3D(fn(this))));
    
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
      break;
      
    // case 'ADD_OBJECT3D':
    //   this.scene.add(lastAction.payload);
    //   break;
    
    }
  }
  
  // updateScene() {
  //   const { dispatch } = this.store;
  //   const { scenesObjectsIds, currentSceneSetName, object3Ds } = this.state;
  //   const currentSceneObjects = this.scene.children;
  //   const nextSceneSet = sceneSets[currentSceneSetName];
  //   const nextSceneObjectsIds = scenesObjectsIds[currentSceneSetName];
  //   this.controls = new nextSceneSet.Controls(this.camera, this.renderer.domElement, this.store);
    
  //   // If state.scenesObjectsIds[currentSceneSetName] is undefined we build the associated objects
  //   // This wont work eventually...
  //   if (!nextSceneObjectsIds) nextSceneSet.builders.forEach(builder => dispatch(ac.createObject3D({
  //     promise: builder(this),
  //     sceneSetName: currentSceneSetName,
  //   })));
    
  //   else {
  //     currentSceneObjects.forEach(obj => {
  //       if (nextSceneObjectsIds.indexOf(obj.id) === -1) this.scene.remove(obj);
  //     });
  //     nextSceneObjectsIds.forEach(id => this.scene.add(object3Ds[id]));
  //   }
  // }
  

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
