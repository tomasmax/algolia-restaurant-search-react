
let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let autoprefixer = require('autoprefixer')

var config = {
  context: __dirname + '/src',
  entry: {
    html: './index.html',
    js: './index.js',
    vendor: [ 'react' ]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    root: [
      __dirname + 'node_modules'
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new ExtractTextPlugin('styles.css')
  ],
  debug: true,
  devtool: "#eval-source-map",
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(js|jsx)$/,
        loaders: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      { test: require.resolve("jquery"), 
        loader: "expose?$!expose?jQuery" 
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('style-loader', [
          'css-loader?sourceMap&importLoaders=1&localIdentName=[name]_[local]',
          'postcss-loader',
          'sass-loader'
        ])
      }
    ]
  },
  postcss: [
    //https://github.com/postcss/autoprefixer
    autoprefixer({ browsers: ['> 5%'] })
  ]
}

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'inline-source-map'
}

module.exports = config
