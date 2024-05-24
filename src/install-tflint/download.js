const { createWriteStream } = require('fs');
const Progress = require('progress');
const { https } = require('follow-redirects');

/**
 * Download a file at a URL, while displaying a progress bar.
 * @param {string} url The source URL to download from.
 * @param {string} destDir The destination directory.
 */
async function download(url, destDir) {
  return new Promise((resolve, reject) => {
    const fstream = createWriteStream(destDir);
    
    fstream.on('error', (err) => {
      console.error(`Could not open write stream for download: ${err}`);
      reject(err);
    });

    console.log(`Downloading file from ${url}...`);

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        const error = new Error(`Failed to get '${url}' (${res.statusCode})`);
        console.error(error.message);
        reject(error);
        return;
      }

      const totalChunks = parseInt(res.headers['content-length'], 10);
      const prgbar = new Progress('[:bar] :percent ', { total: totalChunks });

      res.on('data', (chunk) => {
        fstream.write(chunk);
        prgbar.tick(chunk.length);
      });

      res.on('end', () => {
        fstream.end();
        console.log('Download finished.');
        resolve();
      });

      res.on('error', (err) => {
        console.error(`Failed to download file: ${err}`);
        reject(err);
      });
    }).on('error', (err) => {
      console.error(`Failed to initiate download: ${err}`);
      reject(err);
    });
  });
}

module.exports = download;
