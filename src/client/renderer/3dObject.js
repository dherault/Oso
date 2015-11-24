import _ from 'three';

export default class 3dObject {
  
  constructor(store, params) {
    const { visible } = params;
    this.visible = visible === false || true;
  }
  
  toogle() {
    this.visible = !this.visible;
  }
  
  show() {
    this.visible = true;
  }
  
  hide() {
    this.visible = false;
  }
  
  
}
