const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.ts',
        styles: './index.scss',
    }, // Your entry point
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].bundle.js', // Use [name] placeholder
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    devServer: {
        static: {
            directory: path.join(__dirname),
        },
        compress: true,
        port: 9000,
        open: true,
        hot: true, // Enable hot module replacement (HMR)
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css', // Output CSS file
        }),
        new HtmlWebpackPlugin({
            template: './index.html', // Use your HTML template file
        }),
    ],
    mode: 'development',
};
