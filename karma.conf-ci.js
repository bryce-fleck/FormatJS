const {sync: globSync} = require('glob');
module.exports = function (config) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log(
      'Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.'
    );
    process.exit(1);
  }

  const FILES = globSync('./packages/*/tests-karma/*.js');

  // Browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/OS combos
  let customLaunchers;
  if (process.env.TRAVIS_PULL_REQUEST_SHA) {
    customLaunchers = {
      sl_chrome: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '11',
      },
    };
  } else {
    customLaunchers = {
      // Sauce Labs keeps failing to get a safari instance
      // sl_safari: {
      //     base: 'SauceLabs',
      //     browserName: 'safari',
      // },
      sl_edge: {
        base: 'SauceLabs',
        browserName: 'MicrosoftEdge',
        version: '16',
      },
      sl_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '70', // Use an older version instead of latest greatest
      },
      sl_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '70', // Use an older version instead of latest greatest
      },
      sl_ie_11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '11',
      },
    };
  }

  config.set({
    basePath: '',
    frameworks: ['jasmine', 'jasmine-matchers'],
    files: FILES,
    reporters: ['progress', 'saucelabs'],
    port: 9876,
    colors: true,
    concurrency: 5,
    sauceLabs: {
      testName: 'formatjs',
      build: process.env.TRAVIS_BUILD_ID,
      recordScreenshots: false,
      connectOptions: {
        port: 5757,
        logfile: 'sauce_connect.log',
      },
      public: 'public',
    },
    plugins: [
      'karma-sauce-launcher',
      'karma-jasmine',
      'karma-jasmine-matchers',
    ],
    // Increase timeout in case connection in CI is slow
    captureTimeout: 120000,
    customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true,
  });
};
