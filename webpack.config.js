module.exports = {
  entry: './src/index.jsx',
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  },
  devServer: {
    contentBase: './static',
    historyApiFallback: true
  }
}
