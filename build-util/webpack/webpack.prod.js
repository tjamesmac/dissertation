const Dotenv = require('dotenv-webpack');
const production = {
  mode: 'production',
  devtool: 'none',
  // plugins: [
  //   new Dotenv({
  //     path: './.env'
  //   })
  // ]
}

module.exports = production;