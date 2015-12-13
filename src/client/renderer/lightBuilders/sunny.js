import _ from 'three';

export default that => {
  const light = new _.DirectionalLight(0xffffff, 1);
  const z = 100; // Yep, need to change that
  light.position.set(100, 100, z);
  
  light.castShadow = true;
  light.shadowCameraNear = 0.01;
  light.shadowCameraFar = 2 * z;
  light.shadowCameraFov = 45;
  light.shadowCameraLeft = -z / 2;
  light.shadowCameraRight = z / 2;
  light.shadowCameraTop = z / 2;
  light.shadowCameraBottom = -z / 2;
  // light.shadowBias = 0.001;
  light.shadowDarkness = 0.2;
  light.shadowMapWidth = 1024;
  light.shadowMapHeight = 1024;
  
  light.name = 'SunnyLight';
  
  return Promise.resolve(light);
};
