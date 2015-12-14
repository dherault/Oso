import _ from 'three';
import loadTexture from '../utils/loadTexture';


export default that => new Promise((resolve, reject) => {
  // loadTexture('images/tiles/topo_3_46.png').then(texture => {
    const img = new Image();
    
    img.onload = () => {
      
      // So...
      // We have a n*n pixels heighmap tile, so n² height points
      // But, we want a 2n * 2n vertices plane, to make it more realistic
      // So there are 4n² - n² = 3n² points without data
      
      // Example tile where A, B, C, D are our elevation data:
      // A - B
      // |   |
      // C - D
      
      // The geometry we want is:
      //  A --- Mab --- B
      //  |      |      |
      // Mac - Mabcd - Mbd
      //  |      |      |
      //  C --- Mcd --- D
      
      // All the Mxx and Mxxxx points are lacking elevation data. 
      // Let's use them to smooth our geometry with some maths
      
      const imgSize = img.width; // unit: pixels
      const planeSize = 100; // unit: Three.js distance
      const nvs = 2 * imgSize - 1; // We'll create a plane of n*n vertices (nvs : number of vertices on a side)
      
      // The geometry is initially a plane made of nvs - 1 segments on it's side, so nvs² vertices total
      const geometry = new _.PlaneGeometry(planeSize, planeSize, nvs - 1, nvs - 1);
      const elevationData = getElevationData(img); // Array [A, B, C, D]
      const matrix = []; // Dimension nvs², our final elevation data
      
      // First we pour our elevation data into our matrix so we'll have
      //  A ---  0  --- B
      //  |      |      |
      //  0  -   0   -  0
      //  |      |      |
      //  C ---  0  --- D
      // Where '0' is in fact 'undefined'
      
      let dataCur = 0;
      for (let i = 0; i < nvs; i += 2) {
        matrix[i] = [];
        for (let j = 0; j < nvs; j += 2) {
          matrix[i][j] = elevationData[dataCur++];
        }
      }
      
      /* Intermediate result visualisation: */
      // console.log(matrix);
      // let verticesCur = 0;
      // for (let i = 0; i < nvs; i++) {
      //   if (!matrix[i]) {
      //     verticesCur += nvs;
      //     continue;
      //   }
      //   for (let j = 0; j < nvs; j++) {
      //     geometry.vertices[verticesCur].z = matrix[i][j] || 0;
      //     verticesCur++;
      //   }
      // }
      
      // Next we'll want to compute all the Mxx values
      // All Mxx values are positinned at i, j where i + j is odd
      // Let's look at Mab. If it's elevation value is the average of its neighbours A and B
      // Then all of this would be for nothing, the end result will look the same as a n*n geometry,
      // Except whit 4 times the vertices so it'll be less performant
      // What we want is to smooth the surface, using an home made algo I can't describe with just text
      // I call it 'simple mean tangeant extrapolation'
      
      for (let i = 0; i < nvs; i++) {
        if (!matrix[i]) matrix[i] = [];
        
        for (let j = 0; j < nvs; j++) {
          const iIsOdd = i % 2;
          const jIsOdd = j % 2;
          
          if (iIsOdd !== jIsOdd) {
            // From now on matrix[i][j] is a Mxx point
            if (iIsOdd) {
              if (i === 1 || i === nvs - 2) matrix[i][j] = (matrix[i + 1][j] + matrix[i - 1][j]) / 2;
              else matrix[i][j] = (5 * (matrix[i - 1][j] + matrix[i + 1][j]) - matrix[i - 3][j] - matrix[i + 3][j]) / 8;
            } else {
              if (j === 1 || j === nvs - 2) matrix[i][j] = (matrix[i][j + 1] + matrix[i][j - 1]) / 2;
              else matrix[i][j] = (5 * (matrix[i][j - 1] + matrix[i][j + 1]) - matrix[i][j - 3] - matrix[i][j + 3]) / 8;
            }
          }
        }
      }
      
      // /* Intermediate result visualisation: */
      // console.log(nvs, matrix.length);
      // console.log(matrix);
      // let verticesCur = 0;
      // for (let i = 0; i < nvs; i++) {
      //   for (let j = 0; j < nvs; j++) {
      //     geometry.vertices[verticesCur].z = matrix[i][j] || 0;
      //     verticesCur++;
      //   }
      // }
      
      // Now all is left is to fill the remaining Mxxx gaps
      // We'll simply use the average of it's for neighbours
      
      for (let i = 1; i < nvs; i += 2) {
        for (let j = 1; j < nvs; j += 2) {
          matrix[i][j] = (matrix[i - 1][j] + matrix[i + 1][j] + matrix[i][j - 1] + matrix[i][j + 1]) / 4;
        }
      }
      
      // /* final result visualisation: */
      let verticesCur = 0;
      for (let i = 0; i < nvs; i++) {
        for (let j = 0; j < nvs; j++) {
          geometry.vertices[verticesCur].z = matrix[i][j] || 0;
          verticesCur++;
        }
      }
      
      const material = new _.MeshPhongMaterial({
        // map: texture,
        wireframe: true,
        side: _.FrontSide
      });
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
function getElevationData(img, scale=1) {
  
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
