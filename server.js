const path = require('path')
const webpack = require('webpack')
const express = require('express')
const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)
const port = process.env.PORT || 8080;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, function (err, result) {
  if (err) console.log(err)
  console.log('App running on http://localhost:'+port)
})
