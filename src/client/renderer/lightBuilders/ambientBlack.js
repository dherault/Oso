import _ from 'three';

export default that => {
  const light = new _.AmbientLight(0x222222);
  light.name = 'AmbientLight';
  return Promise.resolve(light);
};
