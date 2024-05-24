const { createWriteStream } = require('fs');
const { open } = require('yauzl');
/**
 * Unzips a specified file.
 * @param {string} zipDir The directory of the target zip file.
 * @param {string} destDir The destination directory for the unzipped file.
 */
async function unzip(zipDir, destDir) {
  return new Promise(resolve => {
    console.log(`Unzipping archive at ${zipDir}...`);
    open(zipDir, { lazyEntries: true }, function(err, zipfile) {
      if (err) {
        console.error(`Could not open zip file: ${err}`);
        process.exit(40);
      }

      zipfile.readEntry();
      zipfile.on('entry', function(entry) {
        if (/\/$/.test(entry.fileName)) {
          zipfile.readEntry();
        } else {
          zipfile.openReadStream(entry, function(err, readStream) {
            if (err) {
              console.error(`Could not open read stream: ${err}`);
              process.exit(41);
            }
            readStream.on('end', function() {
              zipfile.readEntry();
            });
            readStream.pipe(createWriteStream(destDir));
          });
        }
      });
      zipfile.on('end', resolve);
    });
  });
}
module.exports = unzip;
