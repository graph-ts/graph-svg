const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = (_, argv) => {

    const mode = argv.mode;
    const isDev = mode === 'development';

    return {
        mode: isDev ? 'development' : 'production',
        context: __dirname,
        entry: [
            isDev && 'webpack-hot-middleware/client',
            './examples/index.tsx'
        ].filter(Boolean),
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'docs'),
            publicPath: isDev ? '/' : './',
            clean: true
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        resolve: {
            extensions: ['.js', '.jsx', '.tsx', '.ts']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: [
                        path.join(__dirname, 'src'),
                        path.join(__dirname, 'examples')
                    ],
                    use: [
                        isDev && {
                            loader: 'babel-loader',
                            options: { plugins: ['react-refresh/babel'] }
                        },
                        {
                            loader: 'ts-loader',
                            options: { transpileOnly: true }
                        }
                    ].filter(Boolean)
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ]
                }
            ]
        },
        plugins: [
            isDev && new ReactRefreshWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'examples', 'index.html'),
                filename: path.resolve(__dirname, 'docs', 'index.html'),
                inject: true
            })
        ].filter(Boolean)
    }
}