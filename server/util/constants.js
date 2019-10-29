const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    ITUNES_BASE_API: 'https://itunes.apple.com',
    CONNECTION_STRING: process.env.CONNECTION_STRING || '',
    PORT: process.env.PORT || 8080
}