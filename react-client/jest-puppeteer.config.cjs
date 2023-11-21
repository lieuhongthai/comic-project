// jest-puppeteer.config.cjs

/** @type {import('jest-environment-puppeteer').JestPuppeteerConfig} */
module.exports = {
  launch: {
    dumpio: true,
    headless: false,
    product: 'chrome',
	slowMo: 70,
    args: ["--window-size=1920,1080"], // ,"--window-position=1921,0",'https://www.chromestatus.com/'
    defaultViewport: null,

    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  },
};
