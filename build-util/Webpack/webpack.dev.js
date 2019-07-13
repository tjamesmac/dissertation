const Dotenv = require('dotenv-webpack');
const development = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new Dotenv({
      path: './.env.development'
    })
  ]
}

module.exports = development;
