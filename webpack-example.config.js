const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const getAbsoluteDir = dir => path.resolve(__dirname, dir)
const APP_DIR = getAbsoluteDir('./example')
const BUILD_DIR = getAbsoluteDir('./example/dist')

module.exports = (env = {}) => {
  const isProduction = env.production

  const extractCss =  new MiniCssExtractPlugin({
    filename: `[name]${isProduction ? '.min' : ''}.css`,
    chunkFilename: `[id]${isProduction ? '.[hash]' : ''}.css`,
  })

  const plugins = [
    // Generate hot update chunks
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: `${APP_DIR}/src/index.html`,
    }),

    extractCss,
  ]

  if (!isProduction) {
    plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8880 }))
  }

  return {
    context: APP_DIR,
    devServer: {
      contentBase: BUILD_DIR,
      port: 8000,
      open: true,
      hot: true,
      publicPath: '/'
    },

    entry: {
      app: `${APP_DIR}/src/app.jsx`,
    },
    output: {
      path: BUILD_DIR,
      publicPath: isProduction ? 'https://ferrwan.github.io/react-datetime/' : '/',
      filename: '[name].js',
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        getAbsoluteDir('src/'),
        getAbsoluteDir('node_modules'),
      ],
      alias: {
        'react-datetime': getAbsoluteDir('./src/index')
      }
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
