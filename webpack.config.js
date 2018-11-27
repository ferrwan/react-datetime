const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const getAbsoluteDir = dir => path.resolve(__dirname, dir)
const APP_DIR = getAbsoluteDir('./src/')
const BUILD_DIR = getAbsoluteDir('./dist/')

module.exports = (env = {}) => {
  const isProduction = env.production

  const extractCss = new MiniCssExtractPlugin({
    filename: `[name]${isProduction ? '.min' : ''}.css`,
    chunkFilename: `[id]${isProduction ? '.[hash]' : ''}.css`,
  })

  const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    extractCss,
  ]

  if (!isProduction) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return {
    context: APP_DIR,
    devServer: {
      contentBase: getAbsoluteDir('./src/'),
      port: 8081,
      open: true
    },

    entry: {
      'react-datetime': './index.jsx',
    },
    output: {
      path: BUILD_DIR,
      publicPath: '/dist/',
      filename: `[name]${isProduction ? '.min' : ''}.js`,
      chunkFilename: '[name].js'
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        getAbsoluteDir('src/'),
        getAbsoluteDir('node_modules'),
      ]
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader'
          }]
        },
        {
          test: /\.(sc|c)ss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader: 'style-loader',
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: 'file-loader?name=fonts/[name].[ext]'
        }
      ]
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: 'vendor',
            filename: `vendor${isProduction ? '.min' : ''}.js`
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },

    plugins,
  }
}
