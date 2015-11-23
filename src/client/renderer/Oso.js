import _ from "three";

export default class Oso {
  
  constructor(store) {
    this.store = store;
    this.previousState = {};
    this.currentState = this.store.getState();
    this.clock = new _.Clock();
    this.scene = new _.Scene();
    this.camera = new _.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
    this.renderer = new _.WebGLRenderer();
    this.gridWidth = 40;
    this.gridHeight = 40;
    this.initialize();
    
    this.store.subscribe(() => this.updateState(this.store.getState()));
  }

  initialize() {
    this.camera.position.x = this.gridWidth / 2;
    this.camera.position.y = this.gridHeight / 2;
    this.camera.position.z = 30;
    
    // background
    var plane = new _.Mesh(
        new _.PlaneGeometry(this.gridWidth + 2, this.gridHeight + 2, 0),
        new _.MeshBasicMaterial({color: 0x343434, side: _.DoubleSide})
    );
    plane.position.set(this.gridWidth / 2, this.gridHeight / 2, 0);
    this.scene.add(plane);
    
    this.pointLight = new _.PointLight(0xffffff, 1);
    this.pointLight.position.z = 30;
    this.scene.add(this.pointLight);
    
    this.loop();
  }

  loop() {
    window.requestAnimationFrame(this.loop.bind(this));
    this.update();
    this.render();
  }

  update() {
    this.pointLight.position.x = Math.sin(this.clock.getElapsedTime()) * 4 + 20;
    this.pointLight.position.y = Math.cos(this.clock.getElapsedTime()) * 4 + 20;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  updateState(state) {
    this.previousState = this.currentState;
    this.currentState = state;
  }
}
