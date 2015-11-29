import _ from 'three';
import config from '../config';
import loadTexture from '../utils/loadTexture';

export default that => loadTexture('images/galaxy_starfield.png').then(texture => {
  const material = new _.MeshBasicMaterial({
  	map: texture,
  	side: _.BackSide
  });
  const geometry = new _.SphereGeometry(config.sunEarthDistance, 32, 32);
  return new _.Mesh(geometry, material);
});
