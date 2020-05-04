const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const development =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const nodeExternals = require('webpack-node-externals'); // To skip bundling node_modules in case target is node
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getWebpackConfig = (target) => ({
    entry: {
        app1:
            target === 'node'
                ? './src/client/app1/node.jsx'
                : './src/client/app1/index.jsx',
        app2:
            target === 'node'
                ? './src/client/app2/node.jsx'
                : './src/client/app2/index.jsx',
        generic: './src/client/generic/index.jsx',
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
    devServer: {
        contentBase: './build/' + target,
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
    externals: target === 'node' ? [nodeExternals()] : undefined,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(), new LoadablePlugin()],
});

module.exports = [getWebpackConfig('web'), getWebpackConfig('node')];
