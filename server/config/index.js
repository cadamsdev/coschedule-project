require('./db-connection')


const cors = require('cors')
const bodyParser = require('body-parser')

function setupConfig(app) {
    app.use(cors())
    app.use(bodyParser.json())
}

module.exports = setupConfig