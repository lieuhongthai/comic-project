import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-puppeteer',
  verbose: true,
  testTimeout: 30000,
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium'],
      exitOnPageError: false,
      launchOptions: {
        args: ['--no-sandbox'],
      },
      contextOptions: {
        ignoreHTTPSErrors: true,
      },
    },
  },
};

export default config;
