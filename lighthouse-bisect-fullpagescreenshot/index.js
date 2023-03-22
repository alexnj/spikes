const URL = 'https://wp-rocket.me';

(async function bisect() {
  const execSync = require('child_process').execSync;
  console.log('Running yarn...');
  code = execSync('yarn');

  console.log('Opening a browser...');
  const chromeLauncher = require('chrome-launcher');
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});

  console.log('Running Lighthouse...');
  const lighthouse = require('./lighthouse');
  const options = {logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port};
  const result = await lighthouse(URL, options);

  const sizeOfImage = require('image-size');
  const screenshotHeader = 'data:image/webp;base64,';
  const artifacts = result.artifacts;
  const screenshot = artifacts.FullPageScreenshot?.screenshot;

  const buffer = Buffer.from(screenshot.data.slice(screenshotHeader.length), 'base64');

  const actual = sizeOfImage(buffer);
  const exitCode = actual.width !== +screenshot.width || actual.height !== +screenshot.height;
  console.log(
    `This version is: ${exitCode ? 'Bad' : 'Good'}.\n`,
    `Actual dimensions: ${actual.width}x${actual.height}.\n`,
    `Declared dimensions: ${screenshot.width}x${screenshot.height}.\n`,
  );
  await chrome.kill();

  process.exit(exitCode);
})();