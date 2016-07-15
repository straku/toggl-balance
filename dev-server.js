/* eslint no-console: 0 */
const express = require('express')
const history = require('connect-history-api-fallback')
const webpack = require('webpack')
const config = require('./webpack.config.dev')

const app = express()
const compiler = webpack(config)

const PORT = 3000

app.use(history({
  index: '/index-dev.html',
}))

app.use(express.static('static'))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler))

app.listen(PORT, '0.0.0.0', err => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening at http://localhost:${PORT}`)
})
