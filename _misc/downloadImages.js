import fs from 'fs';
import http from 'http';
import { toBeDownloaded } from './files';

/* CONFIG */
const cleanTempDirOnStart = true;
const imagesDirPath = process.cwd() + '/src/server/images/';
const tempDirPath = imagesDirPath + 'temp/';


// Cleans the temp dir
let cleanTempDir = Promise.resolve();
if (cleanTempDirOnStart) cleanTempDir = new Promise((resolve, reject) => {
  fs.readdir(tempDirPath, (err, files) => {
    if (err) throw err;
    const nFiles = files.length;
    
    console.log(`Deleting ${nFiles} files in ${tempDirPath}`);
    Promise.all(files.map((file, i) => new Promise((resolve, reject) => {
      console.log(`... ${i + 1}/${nFiles}: ${file}`);
      fs.unlink(tempDirPath + file, err => {
        if (err) throw err;
        resolve();
      });
    }))).then(resolve);
  });
});

cleanTempDir.then(() => {
  console.log('Starting downloads');
  const t = new Date().getTime();
  const l = toBeDownloaded.length;
  
  callDownloadOneFile(0);
  
  function callDownloadOneFile(index) {
    const { url, name } = toBeDownloaded[index];
    downloadFile(url, tempDirPath + name).then(() => {
      const nextIndex = index + 1;
      if (nextIndex === l) {
        const dt = Math.floor((new Date().getTime() - t) / 1000);
        const minutes = Math.floor(dt / 60);
        const seconds = dt - 60 * minutes;
        console.log(`Successfully downloaded ${toBeDownloaded.length} items in ${minutes}min ${seconds}s.`);
      }
      else callDownloadOneFile(nextIndex);
    });
  }
});

// Returns a promises that resolves when the file is downloaded:
function downloadFile(fileUrl, savePath) {
  return new Promise((resolve, reject) => {
    console.log(`\nDownloading ${fileUrl}`);
    
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
      
      res.on("error", err => { throw err });
    });
  });
}
