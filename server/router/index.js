const { Router } = require('express')
const musicRouter = require('./music.router')
const commentRouter = require('./comment.router')

const router = Router()

router.use('/music', musicRouter)
router.use('/comment', commentRouter)

module.exports = router