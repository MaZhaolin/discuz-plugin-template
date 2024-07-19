const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const config = require('./config.json');

const output = fs.createWriteStream(config.output);
const archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log('Archiver has been finalized and the output file descriptor has closed.');
});

archive.on('warning', (err) => {
  if (err.code !== 'ENOENT') {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// 递归添加目录和文件
const addFiles = (dir, base) => {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const relativePath = path.relative(base, fullPath);
    const isExcluded = config.exclude.some(excl => relativePath.includes(excl));

    if (!isExcluded) {
      if (fs.lstatSync(fullPath).isDirectory()) {
        addFiles(fullPath, base);
      } else {
        archive.file(fullPath, { name: relativePath });
      }
    }
  });
};

addFiles(config.input, config.input);
archive.finalize();