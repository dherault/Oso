import _ from 'three';
import loadTexture from '../utils/loadTexture';

const imgSize = 60;
const planeSize = 100;
const planeSegments = 2 * imgSize - 1;

export default that => new Promise((resolve, reject) => {
  // loadTexture('images/tiles/topo_3_46.png').then(texture => {
    const img = new Image();
    
    img.onload = () => {
      
      const data = getHeightData(img);
      console.log('heightmap', data);
      // texture.wrapS = texture.wrapT = _.RepeatWrapping; 
      // texture.repeat.set(10, 10);
      const geometry = new _.PlaneGeometry(planeSize, planeSize, planeSegments, planeSegments);
      const material = new _.MeshPhongMaterial({
        // map: texture,
        wireframe: true,
        side: _.FrontSide
      });
      
      const nVertices = geometry.vertices.length;
      const len = Math.sqrt(nVertices); // The number of vertices on the plane side
      
      const matrix = [];
      // const rowOfZeros = [];
      // for (let i = 0; i < len; i++) {
      //   rowOfZeros[i] = 1;
      // }
      // for (let i = 0; i < len; i++) {
      //   matrix[i] = rowOfZeros;
      // }
      
      // Sets height of vertices
      // let j = 0;
      // for (let i = 0; i < nVertices; i++) {
        
      //   if (i % len === 0) {
      //     i += len + 1;
      //     continue;
      //   }
      //   if (j % 2) geometry.vertices[i].z = (data[j / 2 + 1] + data[j / 2 - 1]) / 2;
      //   else geometry.vertices[i].z = data[j / 2];
      //   j++;
      // }
      
      // So...
      // We have a n*n pixels tile, so n² height points
      // But, we want a 2n * 2n vertices plane, to make it more realistic
      // So there are 4n² - n² = 3n² points without data
      
      let dataCur = 0; // Will crawl the n² height data points
      let verticesCur = 0; // Will crawl the 4n² vertices
      
      // matrix will hold our 4n² points, we fill the missing points with the average of their direct neighbourg
      for (let i = 0; i < len; i++) {
        matrix[i] = [];
        
        // Every row out of two can can't do anything for now, since we need the next row for the average
        if (i % 2) continue;
        else {
          for (let j = 0; j < len; j++) {
            // From data or average
            matrix[i][j] = j % 2 ? data[dataCur++] : (data[dataCur - 1] + data[dataCur]) / 2; 
          }
        }
      }
      
      // At this point half of our matrix rows are empty.
      for (let i = 0; i < len; i++) {
        if (!(i % 2) || !matrix[i + 1]) continue;
        else {
          for (let j = 0; j < len; j++) {
            matrix[i][j] = (matrix[i - 1][j] + matrix[i + 1][j]) / 2;
          }
        }
      }
      
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          geometry.vertices[verticesCur].z = matrix[i][j];
          verticesCur++;
        }
      }
      
      // geometry.vertices[verticesCur].z = matrix[i][j];
      //       verticesCur++;
      
      const plane = new _.Mesh(geometry, material);
      plane.receiveShadow = true;
      plane.castShadow = true;
      
      
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
    
  // });
    
});

// http://danni-three.blogspot.fr/2013/09/threejs-heightmaps.html
function getHeightData(img, scale=1) {
  
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext('2d');
  
  const size = img.width * img.height;
  const data = [];
  
  context.drawImage(img, 0, 0);
  const pix = context.getImageData(0, 0, img.width, img.height).data;
  
  // for (let i = 0; i < size; i ++) {
  //   data[i] = 0;
  // }
  
  // For info: pix.length / 4 === size (4 channels per pix)
  const nPix = pix.length;
  
  let j=0;
  for (let i = 0; i < nPix; i += 4) {
    const all = pix[i] + pix[i+1] + pix[i+2];
    data[j++] = all / (12 * scale);
  }
  
  return data;
}
