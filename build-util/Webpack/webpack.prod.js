const Dotenv = require('dotenv-webpack');
const production = {
  mode: 'production',
  devtool: 'none',
  plugins: [
    new Dotenv({
      path: './.env.production'
    })
  ]
}

module.exports = production;