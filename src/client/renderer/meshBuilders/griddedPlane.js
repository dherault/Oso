import _ from 'three';

export default that => {
  const gridSize = 10;
  const planeSize = 100;
  
  const group = new _.Object3D();
  group.name = 'GriddedPlane';
  
  const planeGeometry = new _.PlaneGeometry(planeSize, planeSize, 1, 1);
  const planeMaterial = new _.MeshBasicMaterial({ color: 0xcccccc });
  const plane = new _.Mesh(planeGeometry, planeMaterial);
  group.add(plane);
  
  const r = planeSize / 2;
  const lineMaterial = new _.LineBasicMaterial({ color: 0x555555 });
  for (let i = 0; i < planeSize; i += gridSize) {
    const geometryX = new _.Geometry();
    const geometryY = new _.Geometry();
    geometryY.vertices.push(new _.Vector3(- r, -r + i, 0), new _.Vector3(r, -r + i, 0));
    geometryX.vertices.push(new _.Vector3(- r + i, -r, 0), new _.Vector3(-r + i, r, 0));
    group.add(new _.Line(geometryX, lineMaterial), new _.Line(geometryY, lineMaterial));
    
  }
  
  return Promise.resolve(group);
};