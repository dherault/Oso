import _ from 'three';
import loadImage from '../utils/loadImage';

export default that => Promise.all([
  loadImage('images/earthcloudmap.jpg'),
  loadImage('images/earthcloudmaptrans.jpg'),
]).then(images => {
  console.log('yolo1')
  // create destination canvas
  const canvasResult = document.createElement('canvas');
  canvasResult.width = that.width;
  canvasResult.height	= that.height;
  const contextResult	= canvasResult.getContext('2d');	
  
  const geometry = new _.SphereGeometry(0.51, 64, 64);
  const material = new _.MeshPhongMaterial({
  	map: new _.Texture(canvasResult),
  	side: _.DoubleSide,
  	transparent: true,
  	opacity: 0.8,
  });
  
  const [imageMap, imageTrans] = images;
  // create dataMap ImageData for earthcloudmap
  const canvasMap	= document.createElement('canvas');
  canvasMap.width	= imageMap.width;
  canvasMap.height = imageMap.height;
  const contextMap = canvasMap.getContext('2d');
  contextMap.drawImage(imageMap, 0, 0);
  const dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height);
  
  // create dataTrans ImageData for earthcloudmaptrans
  const canvasTrans = document.createElement('canvas');
  canvasTrans.width	= imageTrans.width;
  canvasTrans.height = imageTrans.height;
  const contextTrans = canvasTrans.getContext('2d');
  contextTrans.drawImage(imageTrans, 0, 0);
  const dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height);
  // merge dataMap + dataTrans into dataResult
  const dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height);
  for (let y = 0, offset = 0; y < imageMap.height; y++) {
  	for (let x = 0; x < imageMap.width; x++, offset += 4) {
  		dataResult.data[offset+0]	= dataMap.data[offset+0];
  		dataResult.data[offset+1]	= dataMap.data[offset+1];
  		dataResult.data[offset+2]	= dataMap.data[offset+2];
  		dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0];
  	}
  }
  // update texture with result
  contextResult.putImageData(dataResult, 0, 0);	
  material.map.needsUpdate = true;
  
  return new _.Mesh(geometry, material);
});
