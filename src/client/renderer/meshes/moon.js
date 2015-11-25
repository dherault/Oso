import _ from 'three';
import config from '../config';
import loadTexture from '../utils/loadTexture';

export default that => Promise.all([
  loadTexture('images/moonmap1k.jpg'),
  loadTexture('images/moonbump1k.jpg'),
]).then(textures => {
  const { moonRadius, earthMoonDistance, earthMoonDistanceScale } = config;
  const geometry	= new _.SphereGeometry(moonRadius, 32, 32);
  const material	= new _.MeshPhongMaterial({
    map	: textures[0],
    bumpMap	: textures[1],
    bumpScale: 0.002,
  });
  const mesh	= new _.Mesh(geometry, material);
  mesh.position.set(earthMoonDistanceScale * earthMoonDistance, 0, 0);
  mesh.receiveShadow = true;
  mesh.castShadow	= true;
  
  that.loopListeners.push((s, t, d) => mesh.rotateY( 1/32000 * d ));
  
  return mesh;
});