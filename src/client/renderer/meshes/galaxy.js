import _ from 'three';
import config from '../config';
import loadTexture from '../utils/loadTexture';

export default that => loadTexture('images/galaxy_starfield.png').then(texture => {
  const material = new _.MeshBasicMaterial({
  	map: texture,
  	side: _.BackSide
  });
  const geometry = new _.SphereGeometry(12 * config.earthRadius, 32, 32);
  const mesh = new _.Mesh(geometry, material);
  mesh.name = 'Galaxy_background';
  
  return mesh;
});
