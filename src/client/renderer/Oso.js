import _ from "three";
import loadTexture from './utils/loadTexture';
import createAtmosphereMaterial from './materials/atmosphere';
import createCloudsMesh from './meshes/clouds';
import registerOrbitControls from './OrbitControls';
// import TrackballControls from '../vendor/TrackballControls.js';

registerOrbitControls(_);

const hx = 4;

export default class Oso {
  
  constructor(store) {
    
    this.initialize(store);
    
    // this.clock = new _.Clock();
    this.renderer = new _.WebGLRenderer({ antialias	: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    
    this.camera = new _.PerspectiveCamera(45, this.width / this.height, 0.01, 100);
    this.camera.position.z = 2;
    
		this.controls = new _.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.update();
    
    this.scene = new _.Scene();
		this.scene.add(this.controls.getObject());
		
    this.loopListeners.push(() => this.renderer.render(this.scene, this.camera));
    
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
    const light1 = new _.AmbientLight( 0x222222 );
    const light2 = new _.DirectionalLight( 0xffffff, 1 );
    light2.position.set(5,5,5);
    
    light2.castShadow = true;
    light2.shadowCameraNear = 0.01;
    light2.shadowCameraFar = 15;
    light2.shadowCameraFov = 45;
    light2.shadowCameraLeft = -1;
    light2.shadowCameraRight = 1;
    light2.shadowCameraTop = 1;
    light2.shadowCameraBottom = -1;
    light2.shadowBias = 0.001;
    light2.shadowDarkness = 0.2;
    light2.shadowMapWidth = 1024;
    light2.shadowMapHeight = 1024;
    
    this.scene.add(light1);
    this.scene.add(light2);
    
    // Background: stars
    loadTexture('images/galaxy_starfield.png').then(texture => {
      const material = new _.MeshBasicMaterial({
      	map: texture,
      	side: _.BackSide
      });
      const geometry = new _.SphereGeometry(100, 32, 32);
      const starsMesh = new _.Mesh(geometry, material);
      this.scene.add(starsMesh);
    });
    
    // Container
    const containerEarth	= new _.Object3D();
    containerEarth.rotateZ(-23.4 * Math.PI/180);
    containerEarth.position.z	= 0;
    this.scene.add(containerEarth);
    
    // Earth
    Promise.all([
      loadTexture('images/earth_4k.jpg'),
      loadTexture('images/earth_bump_4k.jpg'),
      loadTexture('images/earth_water_4k.png'),
    ]).then(data => {
      const geometry = new _.SphereGeometry(0.5, 64, 64);
      const material = new _.MeshPhongMaterial({
        map: data[0],
        bumpMap: data[1],
        bumpScale: 0.005,
        specularMap: data[2],
        specular: new _.Color('grey'),
      });
      const earthMesh	= new _.Mesh(geometry, material);
      
      earthMesh.receiveShadow	= true;
      earthMesh.castShadow = true;
      
      containerEarth.add(earthMesh);
      this.loopListeners.push((s, t, d) => earthMesh.rotateY( 1/32000 * d ));
    });
    
    // Moon  	
    Promise.all([
      loadTexture('images/moonmap1k.jpg'),
      loadTexture('images/moonbump1k.jpg'),
    ]).then(data => {
      const geometry	= new _.SphereGeometry(0.5, 32, 32);
      const material	= new _.MeshPhongMaterial({
        map	: data[0],
        bumpMap	: data[1],
        bumpScale: 0.002,
      });
      const moonMesh	= new _.Mesh(geometry, material);
      moonMesh.position.set(0.5,0.5,0.5);
      moonMesh.scale.multiplyScalar(1/5);
      moonMesh.receiveShadow	= true;
      moonMesh.castShadow	= true;
      
      containerEarth.add(moonMesh);
    });
    
    // Atmosphere
    // const atmosphereGeometry1 = new _.SphereGeometry(0.5, 64, 64);
    // const atmosphereMaterial1 = createAtmosphereMaterial();
    // atmosphereMaterial1.uniforms.glowColor.value.set(0xffffff);
    // atmosphereMaterial1.uniforms.coeficient.value	= 0.8;
    // atmosphereMaterial1.uniforms.power.value		= 2.0;
    // const atmosphereMesh1 = new _.Mesh(atmosphereGeometry1, atmosphereMaterial1);
    // atmosphereMesh1.scale.multiplyScalar(1.01);
    // containerEarth.add(atmosphereMesh1);
    
    // const atmosphereGeometry2 = new _.SphereGeometry(0.5, 64, 64);
    // const atmosphereMaterial2 = createAtmosphereMaterial();
    // atmosphereMaterial2.side = _.BackSide;
    // atmosphereMaterial2.uniforms.glowColor.value.set(0xffffff);
    // atmosphereMaterial2.uniforms.coeficient.value	= 0.5;
    // atmosphereMaterial2.uniforms.power.value = 4.0;
    // const atmosphereMesh2 = new _.Mesh(atmosphereGeometry2, atmosphereMaterial2);
    // atmosphereMesh2.scale.multiplyScalar(1.15);
    // containerEarth.add(atmosphereMesh2);
    
    // Clouds
    // createCloudsMesh(this).then(cloudsMesh => {
    //   cloudsMesh.receiveShadow = true;
    //   cloudsMesh.castShadow	= true;
    //   containerEarth.add(cloudsMesh);
    //   console.log('yolofinal')
    //   this.loopListeners.push((s, t, pt) => cloudsMesh.rotation.y += 1/8000 * (t - pt));
    // });
    
    
    
  }
  
  initialize(store) {
    const updateState = () => {
      this.previousState = this.state;
      this.state = this.store.getState();
    };
    
    this.store = store;
    this.store.subscribe(updateState);
    updateState();
    
    const d = new Date().getTime();
    
    this.loopListeners = [];
    this.previousTime = d;
    this.time = d;
    
    const handleResize = () => {
      this.height = window.innerHeight - hx;
      this.width = window.innerWidth;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    };
    
    this.height = window.innerHeight - hx;
    this.width = window.innerWidth;
    window.onresize = handleResize;
  }

  loop() {
    this.animationFrameId = window.requestAnimationFrame(this.loop.bind(this));
    
    this.previousTime = this.time;
    this.time = new Date().getTime();
    this.loopListeners.slice().forEach(fn => fn(this.state, this.time, this.time - this.previousTime));
  }
  
  start() {
    console.log('Oso start');
    this.loop();
  }
  stop() {
    console.log('Oso stop');
    window.cancelAnimationFrame(this.animationFrameId);
  }
}
