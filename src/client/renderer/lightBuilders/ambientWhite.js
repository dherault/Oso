import _ from 'three';

export default that => {
  const light = new _.AmbientLight(0xffffff);
  light.name = 'AmbientLight';
  return Promise.resolve(light);
};
