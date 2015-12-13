import _ from 'three';
import loadTexture from '../utils/loadTexture';

const imgSize = 120;

export default that => new Promise((resolve, reject) => {
  loadTexture('images/tiles/texture_3_46.png').then(texture => {
    var img = new Image();
    img.onload = function () {
      console.log('onload');
        //get height data from img
      const data = getHeightData(img);
      console.log('heightmap', data);
    //   texture.wrapS = texture.wrapT = _.RepeatWrapping; 
	   // texture.repeat.set(10, 10);
      const geometry = new _.PlaneGeometry(imgSize, imgSize, imgSize - 1, imgSize - 1);
      const material = new _.MeshPhongMaterial({
        map: texture,
        side: _.FrontSide
      });
      const plane = new _.Mesh(geometry, material);
      plane.receiveShadow = true;
      plane.castShadow = true;
       
      //set height of vertices
      for (let i = 0; i<plane.geometry.vertices.length; i++ ) {
        plane.geometry.vertices[i].z = data[i];
      }
      
      const terrain = new _.Object3D();
      terrain.name = 'Terrain';
      // terrain.receiveShadow = true;
      // terrain.castShadow = true;
      terrain.add(plane);
      // terrain.rotateX(- Math.PI / 2);
      resolve(terrain);
    };
    // load img source
    img.src = 'images/tiles/topo_3_46.png';
    
  });
    
});

// http://danni-three.blogspot.fr/2013/09/threejs-heightmaps.html
function getHeightData(img, scale=1) {
  
  console.log('getHeightData');
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext( '2d' );
  
  const size = img.width * img.height;
  const data = [];
  
  context.drawImage(img,0,0);
  
  for (let i = 0; i < size; i ++) {
    data[i] = 0;
  }
  
  const imgd = context.getImageData(0, 0, img.width, img.height);
  const pix = imgd.data;
  
  let j=0;
  for (let i = 0; i<pix.length; i +=4) {
    const all = pix[i]+pix[i+1]+pix[i+2];
    data[j++] = all/(12*scale);
  }
  
  return data;
}
