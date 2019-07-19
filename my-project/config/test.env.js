'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

// module.exports = merge(devEnv, {
//   NODE_ENV: '"testing"'
// })

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  apiPath: '"http://cai-svc-dev.gb.local"',
  apiPathPrefix: '"http://cai-svc-dev"',
  intBrandID: 3,
})
