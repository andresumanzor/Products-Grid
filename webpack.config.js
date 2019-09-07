const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {

    return {
        mode: argv.mode !== 'production' ? 'production' : 'development',
        entry: ['babel-polyfill', './src/index.js'],
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.s?css$/,
                    use: [
                        'style-loader', // creates style nodes from JS strings
                        // fallback to style-loader in development
                        argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: { minimize: true }
                        }
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/'
                            }
                        }
                    ]
                }
            ]
        },
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        },
        devServer: {
            historyApiFallback: {
                disableDotRule: true
            },
            quiet: true
            // inline: false //uncomment if automatic reload bothers you
        },
        plugins: [
            argv.mode === 'production' ? new CleanWebpackPlugin() : null,
            new webpack.DefinePlugin({
                // 'process.env.TEST_VAR': JSON.stringify(process.env.TEST_VAR)
            }),
            // new PrettierPlugin(),
            new HtmlWebPackPlugin({
                template: './index.html',
                filename: './index.html'
            }),
            new CopyWebpackPlugin([{ from: './assets', to: '../public/assets' }]),
            new MiniCssExtractPlugin({
                filename: 'bundle.css',
                chunkFilename: 'bundle.css'
            }),
            new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: ['You application is running here http://localhost:8080']
                }
            }),
            new CompressionPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.(js|css|html|svg)$/,
                // compressionOptions: { level: 11 },
                threshold: 10240,
                minRatio: 0.8,
                deleteOriginalAssets: false
            }),
            function()
            {
                this.plugin("done", function(stats)
                {
                    if (stats.compilation.errors && stats.compilation.errors.length)
                    {
                        process.exit(1);
                    }
                    // ...
                });
            }
        ].filter(Boolean),
        devtool: argv.mode === 'production' ? 'source-map' : 'eval-source-map'
    };
};
