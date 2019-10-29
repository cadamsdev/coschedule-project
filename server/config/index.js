const cors = require('cors')

function setupConfig(app) {
    app.use(cors())
}

module.exports = setupConfig