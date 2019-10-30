const { Router } = require('express')
const songRouter = require('./song.router')
const commentRouter = require('./comment.router')
const favoriteRouter = require('./favorite.router')

const router = Router()

router.use('/song', songRouter)
router.use('/comment', commentRouter)
router.use('/favorite', favoriteRouter)

module.exports = router