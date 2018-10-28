const path = require('path');

module.exports = {
    mode: 'development',
    bail: true,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    entry: __dirname + '/src/Index.ts',
    output: {
        path: path.resolve(__dirname + '/bin/scripts/'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: '<%= libraryVariable %>',
        publicPath: '/scripts/'
    },
    devServer: {
        contentBase: __dirname + '/bin/',
        compress: true,
        port: 9000
    },
    devtool: 'source-map'
};
