const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use('/', (req, res) => {
//   res.send('hello express!')
// })

app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', (req, res) => {
  var html = fs.redFileSync(path.resolve(__dirname, '../dist.index.html', 'utf-8'))
})
app.listen(3000, () => {
  console.log('app listening on port 3000.')
})
