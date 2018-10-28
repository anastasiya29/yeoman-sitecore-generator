const webpackConfig = require('./webpack.config.karma.js');

var configuration = {
    frameworks: ['jasmine'],
    files: [
        { pattern: 'src/Index.ts' },
        { pattern: 'tests/**/*.spec.ts' }
    ],
    preprocessors: {
        'src/**/*.ts': ['webpack'],
        'tests/mocks/**/*.ts': ['webpack'],
        'tests/**/*.spec.ts': ['webpack'],
    },
    webpack: webpackConfig,
    browsers:['ChromeHeadless'],

    // code coverage reporter configuration
    reporters: ['coverage-istanbul', 'spec'],
    coverageIstanbulReporter: {
        dir: './bin/coverage',
        reports: [ 'cobertura', 'json', 'lcov', 'text-summary' ],
        fixWebpackSourcePaths: true
    }
};

module.exports = function(config) {
  config.set(configuration);
};
