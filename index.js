'use strict';

const path = require('path');
const fs = require('fs').promises;

async function ensureDir(fromTo) {
  const toPath = path.dirname(fromTo.to);

  await fs.mkdir(toPath, { recursive: true });
}

async function copyFile(fromTo) {
  await fs.cp(fromTo.from, fromTo.to, { dereference: true, recursive: true });
}

async function ensureDirAndCopy(root, relativeFromTo) {
  const fromTo = {
    from: path.join(root, relativeFromTo.from),
    to: path.join(root, relativeFromTo.to)
  };

  await ensureDir(fromTo);
  await copyFile(fromTo);

  return fromTo;
}

module.exports = function (root, copyItems) {
  return Promise.all(copyItems.map(relativeFromTo => ensureDirAndCopy(root, relativeFromTo)));
};
