import _ from 'three';

export default that => {
  const cubeSize = 1;
  
  const geometry = new _.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const geometry2 = new _.BoxGeometry(cubeSize / 4, cubeSize / 4, cubeSize / 4);
  const material = new _.MeshPhongMaterial({ color: 0x99ff33 });
  const cube = new _.Mesh(geometry, material);
  const cube2 = new _.Mesh(geometry2, material);
  
  cube.translateZ(cubeSize / 2);
  cube2.translateZ(9 * cubeSize / 8);
  cube2.translateX(3 * cubeSize / 8);
  
  const group = new _.Object3D();
  group.add(cube, cube2);
  group.name = 'Avatar';
  
  
  return Promise.resolve(group);
};
