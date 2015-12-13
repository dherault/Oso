import _ from 'three';
// import config from '../config';

export default that => {
  const origin = new _.Vector3();
  
  const materialR = new _.LineBasicMaterial({ color: 0xff0000 });
  const materialG = new _.LineBasicMaterial({ color: 0x00ff00 });
  const materialB = new _.LineBasicMaterial({ color: 0x0000ff });
  
  const geometryX = new _.Geometry();
  const geometryY = new _.Geometry();
  const geometryZ = new _.Geometry();
  geometryX.vertices.push(origin, new _.Vector3(100, 0, 0));
  geometryY.vertices.push(origin, new _.Vector3(0, 100, 0));
  geometryZ.vertices.push(origin, new _.Vector3(0, 0, 100));
  
  const lineX = new _.Line(geometryX, materialR);
  const lineY = new _.Line(geometryY, materialG);
  const lineZ = new _.Line(geometryZ, materialB);
  
  const container = new _.Object3D();
  container.add(lineX, lineY, lineZ);
  container.name = 'Axes';
  // container.visible = false;
  
  return Promise.resolve(container);
};
