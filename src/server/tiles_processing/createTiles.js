import fs from 'fs';
import sharp from 'sharp';
import { toBeProcessed } from './files';

/* CONFIG */
// const cleanTempDirOnStart = true;
const imagesDirPath = process.cwd() + '/src/server/images/';
const tempDirPath = imagesDirPath + 'temp/';
const tilesDirPath = imagesDirPath + 'tiles/';
const tilesSizeInDeg = 1; // We'll create 1deg * 1deg tiles
const tilesFormat = 'png';

console.log('Creating tiles from', ...toBeProcessed.map(({ name }) => name));

fs.readdir(tempDirPath, (err, files) => {
  if (err) throw err;
  
  const l = toBeProcessed.length;
  callProcessOneFile(0);
  
  function callProcessOneFile(index) {
    processOneFile(toBeProcessed[index]).then(() => {
      const nextIndex = index + 1;
      nextIndex === l ? console.log('All done!') : callProcessOneFile(nextIndex);
    });
  }
  
  function processOneFile({ name, quadrant, tilePrefix }) {
    
    return new Promise(resolve => {
      if (files.indexOf(name) !== -1) {
        console.log(`\nProcessing ${tilePrefix} file ${name}.`);
        
        const input = sharp(tempDirPath + name);
        const { upperLeftLon, upperLeftLat, quadrantWidth } = quadrant;
        
        input.metadata((err, { width, height }) => {
          if (err) throw err;
          
          const tileSizeInPixel = width / quadrantWidth / tilesSizeInDeg; // Tiles are squares
          const nDivisionsX = width / tileSizeInPixel;
          const nDivisionsY = height / tileSizeInPixel;
          
          // Shrinks textures to closest 2 pow
          const log2w = Math.log2(tileSizeInPixel);
          const absLog2w = Math.floor(log2w);
          let finalSizeInPixel = tileSizeInPixel;
          if (tilePrefix === 'texture' && log2w !== absLog2w) {
            finalSizeInPixel = Math.pow(2, absLog2w);
          }
          
          console.log(`Will create ${nDivisionsX * nDivisionsY} ${finalSizeInPixel}x${finalSizeInPixel}px tiles from ${name}`);
          
          // The actual tiles creation
          for (let x = 0; x < nDivisionsX; x++) {
            for (let y = 0; y < nDivisionsY; y++) {
              
              const tileFileName = `${tilePrefix}_${upperLeftLon + x}_${upperLeftLat - y}.${tilesFormat}`; 
              
              const output = input.extract({ 
                left: x * tileSizeInPixel, 
                top: y * tileSizeInPixel, 
                width: tileSizeInPixel, 
                height: tileSizeInPixel 
              });
              
              if (finalSizeInPixel === tileSizeInPixel) {
                output.toFile(tilesDirPath + tileFileName, (err, info) => {
                  if (err) {
                    console.log(`Error while creating tile ${tileFileName}`);
                    throw err;
                  }
                  resolve();
                  console.log(`Success ${tileFileName}`);
                });
              } else {
                output.toBuffer((err, buffer) => {
                  if (err) {
                    console.log(`Error while buffering tile ${tileFileName}`);
                    throw err;
                  }
                  
                  sharp(buffer).resize(finalSizeInPixel, finalSizeInPixel)
                  .toFile(tilesDirPath + tileFileName, (err, info) => {
                    if (err) {
                      console.log(`Error while creating tile ${tileFileName}`);
                      throw err;
                    }
                    resolve();
                    console.log(`Success ${tileFileName}`);
                  });
                });
              }
            }
          }
        });
      }
      else throw new Error(`File ${name} not found`);
    });
  }
})
