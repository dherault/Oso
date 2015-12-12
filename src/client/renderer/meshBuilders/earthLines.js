import _ from 'three';
import config from '../config';

export default that => {
  const earthLines = new _.Object3D();
  const { earthRadius, earthSegments } = config;
  const radius = earthRadius * 1.01;
  const xAxis = new _.Vector3(1, 0, 0);
  const yAxis = new _.Vector3(0, 1, 0);
  // const circle = new _.CircleGeometry(earthRadius, earthSegments);
  const PI = Math.PI;
  const PIby12 = PI / 12;
  
  // Longitude
  for (let i = 0; i <= 2 * PI; i += PIby12) {
    const circle = new _.Shape();
    circle.absarc(0, 0, radius, 0, Math.PI*2, false);
    const material = new _.LineBasicMaterial({
      color: 0x00ff00,
      linewidth: 3,
    });
    const mesh = new _.Line(circle.createPointsGeometry(earthSegments), material);
    mesh.rotateOnAxis(yAxis, i);
    earthLines.add(mesh);
  }
  
  // Latitude
  for (let i = -5 * PIby12 ; i <= 5 * PIby12 * PI; i += PIby12) {
    const z = earthRadius * Math.sin(i);
    const circle = new _.Shape();
    circle.absarc(0, 0, 1.01 * z / Math.tan(i), 0, Math.PI*2, false);
    const material = new _.LineBasicMaterial({
      color: 0x00ff00,
      linewidth: 3,
    });
    const mesh = new _.Line(circle.createPointsGeometry(earthSegments), material);
    mesh.rotateOnAxis(xAxis, PI / 2);
    mesh.translateZ(z);
    earthLines.add(mesh);
  }
  
  earthLines.name = 'EarthLines';
  earthLines.visible = false;
  
  return Promise.resolve(earthLines);
};
