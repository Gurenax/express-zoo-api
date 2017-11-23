const express = require('express')
const bodyParser = require('body-parser')

const server = express()

// server.get('/', (req, res) => {
//   res.json({ message: 'This is home' })
// })

// server.get('/about', (req, res) => {
//   res.json({ message: 'This is about' })
// })

// Body Parser
server.use(bodyParser.json())

server.use('/', [
  require('./routes/tickets'),
  require('./routes/animals'),
  require('./routes/sea-critters')
])

server.listen(7000, () => {
  console.log('Started server at http://localhost:7000')
})
