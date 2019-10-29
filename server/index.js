const express = require('express')
const app = express()
const router = require('./router')
const dotenv = require('dotenv')
dotenv.config()

const constants = require('./util/constants')

app.use('', router)

app.listen(constants.PORT, () => console.log(`Server listening on port ${constants.PORT}!`))