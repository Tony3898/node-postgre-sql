global.Tony = {
  Config: {},
}
require('./src/misc/config')

const express = require("express")
const cors = require('cors');
const body_parser = require("body-parser")
const {info} = require("./src/misc/style")
const app = express()

app.use('/github', require("./src/route/github"))
app.use('/github/*', require("./src/route/github"))

app.use(body_parser.json())
app.use(cors())
app.set('port', Tony.Config.connection.port)
app.listen(Tony.Config.connection.port, () => {
  console.log(info("listening on http://" + Tony.Config.connection.host + ":" + Tony.Config.connection.port))
})
