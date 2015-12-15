import _ from 'three';

export default that => {
  const cubeSize = 1;
  
  const geometry = new _.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const material = new _.MeshBasicMaterial({ color: 0x99ff33 });
  const cube = new _.Mesh(geometry, material);
  cube.translateZ(cubeSize / 2);
  
  
  const edges = new _.EdgesHelper(cube, 0x000000);
  
  const group = new _.Object3D();
  group.add(cube, edges);
  
  group.name = 'SimpleCube';
  
  
  return Promise.resolve(group);
};
