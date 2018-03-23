import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

module.exports = {
    entry: { bundle: './src/js/index.js' },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.(js)$/, exclude: /node_modules/, loader: 'babel-loader' },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            matter: 'matter-js'
        })      
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
              commons: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all' }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                compress: {
                    drop_console: true,
                    ecma: 6
                },
                mangle: true
                }
            })
        ]      
    }
}
