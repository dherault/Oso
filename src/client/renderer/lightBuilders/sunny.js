import _ from 'three';

export default that => {
  const light = new _.DirectionalLight( 0xffffff, 1 );
  const x = 600; // Yep, need to change that
  light.position.set(x, 0, 0);
  
  light.castShadow = true;
  light.shadowCameraNear = 0.01;
  light.shadowCameraFar = 2 * x;
  // light.shadowCameraFov = 45;
  light.shadowCameraLeft = -x / 2;
  light.shadowCameraRight = x / 2;
  light.shadowCameraTop = x / 2;
  light.shadowCameraBottom = -x / 2;
  // light.shadowBias = 0.001;
  light.shadowDarkness = 0.2;
  light.shadowMapWidth = 1024;
  light.shadowMapHeight = 1024;
  
  light.name = 'SunnyLight';
  
  return Promise.resolve(light);
};
