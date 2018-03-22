const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const getAbsoluteDir = dir => path.resolve(__dirname, dir)
const APP_DIR = getAbsoluteDir('./src/')
const BUILD_DIR = getAbsoluteDir('./dist/')

module.exports = (env = {}) => {
  console.log(env)
  const isProduction = env.production

  const extractCss = new ExtractTextPlugin({
    filename: `[name]${isProduction ? '.min' : ''}.css`,
  })
  return {
    context: APP_DIR,
    devServer: {
      contentBase: getAbsoluteDir('./src/'),
      port: 8081,
      open: true
    },
    devtool: isProduction ? '' : 'eval-source-map',

    entry: {
      'reactdatetime': './index.jsx',
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
          test: /\.scss$/,
          use: extractCss.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'style-loader'
          })
        },
        {
          test: /\.css$/,
          use: extractCss.extract({
            use: ['css-loader'],
            fallback: 'style-loader'
          })
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: 'file-loader?name=fonts/[name].[ext]'
        }
      ]
    },

    plugins: [
      // Scope Hoisting - New Webpack 3 feature
      new webpack.optimize.ModuleConcatenationPlugin(),

      new webpack.HotModuleReplacementPlugin(),

      extractCss
    ],
  }
}
