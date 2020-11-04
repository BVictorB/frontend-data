const 
  express = require('express')
  path = require('path')
  app = express()
  fs = require('fs')
  fetch = require('node-fetch')

app.use(express.static(__dirname + '/dist'));
 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
})
 
app.listen(8000)