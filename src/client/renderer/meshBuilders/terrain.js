import _ from 'three';

export default that => {
  const geometry = new _.PlaneGeometry(200, 200, 32);
  const material = new _.MeshBasicMaterial({ color: 0xdddddd, side: _.FrontSide });
  const plane = new _.Mesh(geometry, material);
  
  const terrain = new _.Object3D();
  terrain.name = 'Terrain';
  
  terrain.add(plane);
  terrain.rotateX(- Math.PI / 2);
  
  return Promise.resolve(terrain);
};
