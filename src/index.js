const express = require('express')
const route = require('./routes')
require('dotenv').config()
const db = require('./config/db')
const app = express()
const port = 3000

db.connect()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

route(app)

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})