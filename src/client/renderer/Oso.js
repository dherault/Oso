import _ from "three";
import loadTexture from './utils/loadTexture';
import createAtmosphereMaterial from './materials/atmosphere';
import createCloudsMesh from './meshes/clouds';
// import TrackballControls from '../vendor/TrackballControls.js';

export default class Oso {
  
  constructor(store) {
    this.store = store;
    this.previousState = {};
    this.state = this.store.getState();
    
    const d = new Date().getTime();
    this.previousTime = d;
    this.time = d;
    
    this.height = window.innerHeight - 25;
    this.width = window.innerWidth;
    window.onresize = this.handleResize.bind(this);
    
    this.clock = new _.Clock();
    this.scene = new _.Scene();
    this.camera = new _.PerspectiveCamera(45, this.width / this.height, 0.01, 100);
    this.camera.position.z = 1;
    
    // this.controls = new TrackballControls(this.camera);
    
    this.renderer = new _.WebGLRenderer({
    	antialias	: true
    });
    this.renderer.shadowMap.enabled = true;
    this.renderListener = [
      // () => console.log('tick'),
      () => this.renderer.render(this.scene, this.camera),
    ];
    
    // Light
    const light1	= new _.AmbientLight( 0x222222 );
    const light2	= new _.DirectionalLight( 0xffffff, 1 );
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
      this.renderListener.push((s, t, pt) => earthMesh.rotateY( 1/32000 * (t - pt) ));
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
    //   this.renderListener.push((s, t, pt) => cloudsMesh.rotation.y += 1/8000 * (t - pt));
    // });
    
    this.handleResize();
    
    this.store.subscribe(() => {
      this.previousState = this.state;
      this.state = this.store.getState();
    });
    
    this.loop();
  }

  loop() {
    window.requestAnimationFrame(this.loop.bind(this));
    
    this.previousTime = this.time;
    this.time = new Date().getTime();
    
    this.renderListener.slice().forEach(fn => fn(this.state, this.time, this.previousTime));
  }

  handleResize() {
    this.height = window.innerHeight - 25;
    this.width = window.innerWidth;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
}
