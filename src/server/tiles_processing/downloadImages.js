import fs from 'fs';
import http from 'http';
import toBeDownloaded from './files';

/* CONFIG */
const cleanTempDirOnStart = true;
const imagesDirPath = process.cwd() + '/src/server/images';
const tempDirPath = imagesDirPath + '/temp';
const tilesDirPath = imagesDirPath + '/tiles';


// Cleans the temp dir
let cleanTempDir = Promise.resolve();
if (cleanTempDirOnStart) cleanTempDir = new Promise((resolve, reject) => {
  
  fs.readdir(tempDirPath, (err, files) => {
    if (err) return reject(err);
    const nFiles = files.length;
    
    console.log(`Deleting ${nFiles} files in ${tempDirPath}`);
    Promise.all(files.map((file, i) => new Promise((resolve, reject) => {
      console.log(`... ${i + 1}/${nFiles}: ${file}`);
      fs.unlink(tempDirPath + '/' + file, err => err ? reject(err) : resolve());
    }))).then(resolve, reject);
  });
});

cleanTempDir.then(
  () => {
    console.log('Starting downloads');
    const t = new Date().getTime();
    
    // Downloads are simultaneous, this is not so great
    Promise.all(toBeDownloaded.map(({ url, name }) => downloadFile(url, tempDirPath + '/' + name))).then(
    () => {
      const dt = Math.floor((new Date().getTime() - t) / 1000);
      const minutes = Math.floor(dt / 60);
      const seconds = dt - 60 * minutes;
      console.log(`Successfully downloaded ${toBeDownloaded.length} items in ${minutes}min ${seconds}s.`);
    },
    err => console.log(err)  
    );
  },
  err => console.log(err)
);

// Returns a promises that resolves when the file is downloaded:
function downloadFile(fileUrl, savePath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${fileUrl}`);
    
    const remoteFileName = fileUrl.split('/').pop();
    
    const file = fs.createWriteStream(savePath);
    
    http.get(fileUrl, res => {
      
      const len = parseInt(res.headers['content-length'], 10);
      let cur = 0;
      let percentage = 0;
      let previousPercentage = 0;
      
      res.on('data', chunk => {
        file.write(chunk);
        
        // The rest is for display purpose only
        cur += chunk.length;
        percentage = Math.floor(100.0 * cur / len);
        if (percentage !== previousPercentage) {
          console.log(percentage + "%", remoteFileName);
          previousPercentage = percentage;
        }
      });
      
      res.on('end', () => {
        file.end();
        resolve(savePath);
        console.log(`Saved ${savePath}`);
      });
      
      res.on("error", err => reject(err));
    });
  });
}
