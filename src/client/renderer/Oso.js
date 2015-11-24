import _ from "three";
import loadTexture from './utils/loadTexture';

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
    this.camera = new _.PerspectiveCamera(45, this.width / this.height, 0.01, 1000 );
    this.camera.position.z = 1.5;
    this.renderer = new _.WebGLRenderer();
    this.renderListener = [
      // () => console.log('tick'),
      () => this.renderer.render(this.scene, this.camera),
    ];
    
    // Light
    const light1	= new _.AmbientLight( 0x888888 );
  	const light2	= new _.DirectionalLight( 0xcccccc, 1 );
  	light2.position.set(5,3,5);
  	
  	
  	// Earth
    Promise.all([
      loadTexture('images/earthmap1k.jpg'),
      loadTexture('images/earthbump1k.jpg'),
      loadTexture('images/earthspec1k.jpg'),
    ]).then(data => {
      
    	const geometry = new _.SphereGeometry(0.5, 32, 32);
    	const material = new _.MeshPhongMaterial({
    		map: data[0],
    		bumpMap: data[1],
    		bumpScale: 0.05,
    		specularMap: data[2],
    		specular: new _.Color('grey'),
    	});
    	const earthMesh	= new _.Mesh(geometry, material);
    	this.renderListener.push((s, t, pt) => earthMesh.rotateY( 1/32000 * (t - pt) ));
    	this.scene.add(earthMesh);
    });
    
	  this.scene.add(light1);
  	this.scene.add(light2);
    
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
