const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const getWebpackConfig = (target) => ({
    entry: {
        main: target === 'node' ? './src/client/react-router.jsx' : './src/client/index.jsx',
    },
    mode: development ? 'development' : 'production',
    target,
    devtool: 'source-map',
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        console: true,
    },
    output: {
        path: path.resolve(__dirname, './build/', target),
        filename: '[name]-[contenthash].bundle.js',
        chunkFilename: '[name]-[contenthash].bundle.js',
        publicPath: '/build/' + target + '/',
        globalObject: 'this',
        libraryTarget: target === 'node' ? 'commonjs2' : undefined,
    },
    optimization: {
        //runtimeChunk: 'single',
        moduleIds: 'hashed',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(), new LoadablePlugin()],
});

module.exports = [getWebpackConfig('web'), getWebpackConfig('node')];
