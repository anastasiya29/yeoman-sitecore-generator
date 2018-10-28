const fs = require('fs'), ncp = require('ncp').ncp;

const directoriesToCreate = [
  "./bin",
  "./bin/css",
  "./bin/lib",
  "./bin/json"
]

const filesToCopy = [];

const folderToCopy = [{
  "src": "../dist/lib",
  "dest" : "./bin/lib"
},{
  "src": "../dist/css",
  "dest" : "./bin/css"
},{
  "src":'./src/project/pages',
  "dest":'./bin'
},
{
  "src":'./src/project/json',
  "dest":'./bin/json'
}];

directoriesToCreate.filter(directory => !fs.existsSync(directory)).forEach(directory => fs.mkdirSync(directory));

filesToCopy.forEach(file => fs.createReadStream(file.src).pipe(fs.createWriteStream(file.dest)))
folderToCopy.forEach(folder => ncp(folder.src, folder.dest));