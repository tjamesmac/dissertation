const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'none',
  entry: {
    index: './src/public/typescript/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
}
