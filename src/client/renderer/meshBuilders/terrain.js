import _ from 'three';
import loadImage from '../utils/loadImage';
import loadTexture from '../utils/loadTexture';

// Tile creation, needs refactoring

export default that => {
  const toBeLoaded = '3.5_46';
  
  return Promise.all([
    loadImage(`tiles/topo_${toBeLoaded}.png`),
    loadTexture(`tiles/texture_${toBeLoaded}.png`),
    // loadTexture(`images/grass_texture.png`),
  ]).then(([topoTile, texture]) => {
    
    const canvas = document.createElement('canvas');
    
    // Strong assumption: tiles are squares
    const tileSizeInPixel = topoTile.width;
    canvas.width = canvas.height = tileSizeInPixel;
    
    const context = canvas.getContext('2d');
    context.drawImage(topoTile, 0, 0);
    const pix = context.getImageData(0, 0, tileSizeInPixel, tileSizeInPixel).data;
    
    // For info: pix.length / 4 === size (4 channels per pix)
    const nPix = pix.length;
    
    // from http://danni-three.blogspot.fr/2013/09/threejs-heightmaps.html
    let j=0;
    const elevationData = [];
    for (let i = 0; i < nPix; i += 4) {
      const all = pix[i] + pix[i+1] + pix[i+2];
      elevationData[j++] = all / 12;
    }
    
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
    
    const nvs = 2 * tileSizeInPixel - 1; // We'll create a plane of n*n vertices (nvs : number of vertices on a side)
    
    // The geometry is initially a plane made of nvs - 1 segments on it's side, so nvs² vertices total
    const geometry = new _.PlaneGeometry(100, 100, nvs - 1, nvs - 1);
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
    // All Mxx values are positinned at i, j where i and j have the same parity
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
    
    /* final result visualisation: */
    let verticesCur = 0;
    for (let i = 0; i < nvs; i++) {
      for (let j = 0; j < nvs; j++) {
        geometry.vertices[verticesCur].z = matrix[i][j] || 0;
        verticesCur++;
      }
    }
    
    // Who's up for refactoring ?
    
  //   texture.wrapS = texture.wrapT = _.RepeatWrapping; 
	 // texture.repeat.set(20, 20);
    const material = new _.MeshPhongMaterial({
      map: texture,
      side: _.FrontSide,
      // wireframe: true,
    });
    
    
    
    const plane = new _.Mesh(geometry, material);
    plane.receiveShadow = true;
    plane.castShadow = true;
    
    const terrain = new _.Object3D();
    terrain.name = 'Terrain';
    terrain.userData.collidable = true;
    // terrain.receiveShadow = true;
    // terrain.castShadow = true;
    terrain.add(plane);
    
    return terrain;
  });
};
