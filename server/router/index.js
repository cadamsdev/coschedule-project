const { Router } = require('express')
const musicRouter = require('./music/music.router')

const router = Router()

router.use('/music', musicRouter)

module.exports = router