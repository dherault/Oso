import fs from 'fs';
import http from 'http';
import sharp from 'sharp';
import toBeProcessed, { quadrants, quadrantSize } from './files';

/* CONFIG */
// const cleanTempDirOnStart = true;
const imagesDirPath = process.cwd() + '/src/server/images';
const tempDirPath = imagesDirPath + '/temp';
const tilesDirPath = imagesDirPath + '/tiles';
const tilesSizeInDeg = 1; // We'll create 1deg * 1deg tiles
const tilesFormat = 'tiff';

/* INTERNALS */
const topoFiles = toBeProcessed.filter(({ type }) => type === 'topo');
const textureFiles = toBeProcessed.filter(({ type }) => type === 'texture');


console.log('Creating tiles.');
console.log('Topographic files:', topoFiles.map(({ name }) => name));
console.log('Texture files:', textureFiles.map(({ name }) => name));

fs.readdir(tempDirPath, (err, files) => {
  if (err) throw err;
  
  topoFiles.forEach(({ name, quadrant }) => {
    if (files.indexOf(name) !== -1) {
      console.log(`\nProcessing topographic file ${name} for quadrant ${quadrant}.`);
      
      const input = sharp(tempDirPath + '/' + name);
      const { upperLeftLon, upperLeftLat } = quadrants[quadrant];
      
      input.metadata((err, metadata) => {
        if (err) throw err;
        
        // This script assumes it processes square files
        const { width, height } = metadata;
        if (width !== height) throw new Error(`On file ${name}: width and height are not equal`);
        
        const tileSizeInPixel = width / quadrantSize / tilesSizeInDeg;
        const nDivisions = width / tileSizeInPixel; // Should be 90
        console.log(`Will create ${nDivisions * nDivisions} tiles from file ${name}`);
        console.log(metadata);
        
        // The actual tiles creation
        // for (let x = 0; x < nDivisions; x++) {
        //   for (let y = 0; y < nDivisions; y++) {
            
        //     const tileFileName = `topo_${upperLeftLon + x}_${upperLeftLat - y}.${tilesFormat}`; 
            
        //     input.extract({ left: x, top: y, width: tileSizeInPixel, height: tileSizeInPixel })
        //     .toFile(tilesDirPath + '/' + tileFileName, (err, info) => {
        //       if (err) throw new Error(`Error while creating tile ${tileFileName}`);
              
        //       console.log(`Success ${tileFileName}`);
        //     });
        //   }
        // }
        
        const x = 33;
        const y = 90 - 75;
        const tileFileName = `topo_${upperLeftLon + x}_${upperLeftLat - y}.${tilesFormat}`; 
            
        input.extract({ left: x, top: y, width: tileSizeInPixel, height: tileSizeInPixel })
        .toFile(tilesDirPath + '/' + tileFileName, (err, info) => {
          if (err) throw new Error(`Error while creating tile ${tileFileName}`);
          
          console.log(`Success ${tileFileName}`);
        });
      });
    }
  });
  
})