const mongoose = require('mongoose')
const constants = require('../util/constants')

console.log('Connecting to database...')

mongoose.connect(constants.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection

db.on('error', (err) => {
    console.log('Database connection failed!')
    process.exit()
})

db.on('open', () => {
    console.log('Database connection established')
})