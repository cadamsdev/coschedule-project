const { Router } = require('express')
const service = require('../service/favorite.service')
const HttpStatus = require('http-status-codes')
const router = new Router()

router.get('/', (_, res) => {
    service.find()
    .then(favorites => {
        res.status(HttpStatus.OK).json(favorites)
    })
    .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err
        })
    })
})

router.delete("/:trackId", (req, res) => {
    service.deleteOne(req)
    .then(result => {
        res.status(HttpStatus.OK).json(result)
    })
    .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err.message
        })
    })
})

router.post('/', (req, res) => {
    service.save(req).then(() => {
        res.status(HttpStatus.OK)
        res.send()
    })
    .catch(err => {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(err)
    })
})

module.exports = router