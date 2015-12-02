import _ from 'three';
import config from '../config';
import loadTexture from '../utils/loadTexture';

export default that => Promise.all([
  loadTexture('images/earth_4k.jpg'),
  loadTexture('images/earth_bump_4k.jpg'),
  loadTexture('images/earth_water_4k.png'),
]).then(data => {
  const { earthRadius, earthSegments } = config;
  const geometry = new _.SphereGeometry(earthRadius, earthSegments, earthSegments);
  const material = new _.MeshPhongMaterial({
    map: data[0],
    bumpMap: data[1],
    bumpScale: 0.005,
    specularMap: data[2],
    specular: new _.Color('grey'),
  });
  const mesh	= new _.Mesh(geometry, material);
  
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  mesh.name = 'Earth';
  
  // that.loopListeners.push((s, t, d) => mesh.rotateY( 1/32000 * d ));
  
  return mesh;
});