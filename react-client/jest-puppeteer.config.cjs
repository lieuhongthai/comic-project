// jest-puppeteer.config.cjs

/** @type {import('jest-environment-puppeteer').JestPuppeteerConfig} */
module.exports = {
  launch: {
    dumpio: true,
    headless: false,
    product: 'chrome',

    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  },
};
