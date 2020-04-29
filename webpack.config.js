var path = require('path');
var AssetsPlugin = require('assets-webpack-plugin');
var assetsInstance = new AssetsPlugin();


module.exports = {
    entry :  {
        app: ['@babel/polyfill', './src/client/index.jsx']
    },
    devtool: 'source-map',
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      console: true
    },
    output: {
      path: path.resolve(__dirname, './build'),
      filename: '[name]-[hash].js',
      publicPath: '/build/'
    },
    resolve: {
        extensions: [ '.js', '.jsx'],
      },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [ 'style-loader', 'css-loader' ]
            },
        ]
        },
        plugins: [
            assetsInstance
            
        ]

}