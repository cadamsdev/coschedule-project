const express = require('express')
const app = express()
const router = require('./router')
const setupConfig = require('./config')
const constants = require('./util/constants')
const dotenv = require('dotenv')
dotenv.config()

setupConfig(app)

app.use('', router)

app.listen(constants.PORT, () => console.log(`Server listening on port ${constants.PORT}!`))