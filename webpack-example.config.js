const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const getAbsoluteDir = dir => path.resolve(__dirname, dir)
const APP_DIR = getAbsoluteDir('./example')
const BUILD_DIR = getAbsoluteDir('./example/dist')

const extractCss = new ExtractTextPlugin({
  filename: '[name].css',
})

module.exports = (env = {}) => {
  const isProduction = env.production

  return {
    context: APP_DIR,
    devServer: {
      contentBase: BUILD_DIR,
      port: 8000,
      open: true,
      hot: true,
      publicPath: '/'
    },
    devtool: isProduction ? '' : 'eval-source-map',

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

      // Generate hot update chunks
      new webpack.HotModuleReplacementPlugin(),

      new HtmlWebpackPlugin({
        template: `${APP_DIR}/src/index.html`,
        inject: false,
      }),

      extractCss
    ],
  }
}
