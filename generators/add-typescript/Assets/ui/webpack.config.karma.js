const webpackConfig = require('./webpack.config.babel.js');

// Extend base webpack config with istanbul-instrumenter-loader
// configuration for code coverage reporting during karma run.
webpackConfig.devtool = "inline-source-map";

webpackConfig.module.rules.push({
    enforce: "post",
    test: /\.ts$/,
    loader: 'istanbul-instrumenter-loader',
    query: {
        esModules: true
    },
    exclude: [
        /node_modules/,
        /\.spec\.ts$/
    ],
});

module.exports = webpackConfig;
