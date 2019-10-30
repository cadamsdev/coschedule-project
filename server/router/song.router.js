const { Router } = require('express')
const router = new Router()
const service = require('../service/music.service')
const HttpStatus = require('http-status-codes')

router.get('/', (req, res) => {
    service.find(req.query)
    .then(result => {
        res.status(HttpStatus.OK).json(result.data.results)
    })
    .catch(err => {
        response.status(HttpStatus.BAD_REQUEST).json({
            error: err.message
        })
    })
})

router.get('/discover', (_, res) => {
    service.discover()
    .then(result => {
        res.status(HttpStatus.OK).json(result.data.results)
    })
    .catch(err => {
        response.status(HttpStatus.BAD_REQUEST).json({
            error: err.message
        })
    })
})

module.exports = router