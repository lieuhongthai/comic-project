import type { Config } from 'jest';

// ** Link "expect-puppeteer" Api
// ** https://github.com/argos-ci/jest-puppeteer/blob/main/packages/expect-puppeteer/README.md#api
const config: Config = {
  preset: 'jest-puppeteer',
  verbose: true,
  testTimeout: 30000,
  setupFilesAfterEnv: ['expect-puppeteer'],

  coverageDirectory: '<rootDir>/.report-automation-test/coverage',
  coverageReporters: ['text', 'json', 'html'],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Project-comic-app',
        outputPath: '.report-automation-test/index.html',
        includeFailureMsg: true,
      },
    ],
  ],
};

export default config;
