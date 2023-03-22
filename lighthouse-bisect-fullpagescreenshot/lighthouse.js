const { cwd } = require('process');
const fs = require('fs')

let lighthouse;
const lhNewPath = cwd() + '/core/index.cjs';
if (!lighthouse && fs.existsSync(lhNewPath)) {
  lighthouse = require(lhNewPath)
}

const lhOldPath = cwd() + '/lighthouse-core/index.js';
if (!lighthouse && fs.existsSync(lhOldPath)) {
  lighthouse = require(lhOldPath)
}

if (!lighthouse) {
  throw new Error('Couldnt identify a Lighthouse to run in this version');
}

module.exports = lighthouse;