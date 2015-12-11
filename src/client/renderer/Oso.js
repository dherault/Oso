import _ from "three";
// import loadTexture from './utils/loadTexture';
// import createAtmosphereMaterial from './materials/atmosphere';
// import createCloudsMesh from './meshes/clouds';
import Controls from './Controls';

import log from '../../utils/log';
import ac from '../../state/actionCreators';
// import createMoon from './meshes/moon';
import createEarth from './meshes/earth';
import createGalaxy from './meshes/galaxy';
import config from './config';


// import TrackballControls from '../vendor/TrackballControls.js';

const hx = 4;

export default class Oso {
  
  constructor(store) {
    
    this.initialize(store);
    
    // this.clock = new _.Clock();
    this.renderer = new _.WebGLRenderer({ antialias	: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    
    this.camera = new _.PerspectiveCamera(45, this.width / this.height); // fov and aspect are not controlled by the state
    
		this.controls = new Controls(this.camera, this.renderer.domElement, this.store);
    
    this.scene = new _.Scene();
		this.scene.add(this.camera);
		
    this.loopListeners.push(() => this.renderer.render(this.scene, this.camera));
    // this.loopListeners.push(() => this.controls.update());
    
    /*
      match(this.state.router.pathname, gameSets, set => {
        const { camera, controls, lights, objects } = set;
        
        this.scene = new _.Scene();
        
        this.camera = camera;
        this.controls = controls;
        this.controls.update();
        this.scene.add(this.controls.getObject());
        
        this.loopListeners.push(() => this.renderer.render(this.scene, this.camera));
        
        lights.forEach(light => ac.createLight(light))
        objects.forEach(object => ac.create3dObject(light))
        
        this.state.lights.forEach(light => {
          if (light.enabled) this.scene.add(lightP(this)) //lightP promiser
        })
        
        // ...
        
      })
    */
    // Light
    // var geometry = new _.SphereGeometry(config.sunRadius, 32, 32);
    // var material = new _.MeshPhongMaterial();
    // var sun = new _.Mesh(geometry, material);
    // sun.position.set(config.sunEarthDistance * config.sunEarthDistanceScale, 0, 0);
    // this.scene.add(sun);
    const light1 = new _.AmbientLight( 0x222222 );
    const light2 = new _.DirectionalLight( 0xffffff, 1 );
    const x = 2 *config.earthMoonDistance * config.earthMoonDistanceScale;
    light2.position.set(x, 0, 0);
    
    light2.castShadow = true;
    light2.shadowCameraNear = 0.01;
    light2.shadowCameraFar = 2 * x;
    // light2.shadowCameraFov = 45;
    light2.shadowCameraLeft = -x / 2;
    light2.shadowCameraRight = x / 2;
    light2.shadowCameraTop = x / 2;
    light2.shadowCameraBottom = -x / 2;
    // light2.shadowBias = 0.001;
    light2.shadowDarkness = 0.2;
    light2.shadowMapWidth = 1024;
    light2.shadowMapHeight = 1024;
    
    this.scene.add(light1);
    this.scene.add(light2);
    
    [createGalaxy(this), createEarth(this)].map(promise => this.dispatch(ac.createObject3D(promise)));
    
  }
  
  initialize(store) {
    this.store = store;
    this.dispatch = this.store.dispatch;
    this.store.subscribe(this.updateState.bind(this));
    this.updateState();
    
    const d = new Date().getTime();
    
    this.loopListeners = [];
    this.previousTime = d;
    this.time = d;
    
    this.height = window.innerHeight - hx;
    this.width = window.innerWidth;
    window.onresize = this.handleResize.bind(this);
  }
  
  updateState() {
    this.previousState = this.state;
    this.state = this.store.getState();
    
    // log('updateState');
    const { object3Ds } = this.state;
    
    for (let id in object3Ds) {
      if (!this.scene.getObjectById(id)) this.scene.add(object3Ds[id]);
      // console.log(id);
    }
  }

  loop() {
    this.animationFrameId = window.requestAnimationFrame(this.loop.bind(this));
    
    this.previousTime = this.time;
    this.time = new Date().getTime();
    this.loopListeners.slice().forEach(fn => fn(this.state, this.time, this.time - this.previousTime));
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
