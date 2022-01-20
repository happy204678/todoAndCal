'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"'
// })
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  apiPath: '"http://cai-svc-dev.gb.local"',
  apiPathPrefix: '"http://cai-svc-dev"',
  intBrandID: 3,
})
