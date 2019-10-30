const { Router } = require('express')
const router = new Router()
const service = require('../service/comment.service')
const HttpStatus = require('http-status-codes')

router.get('/', (_, res) => {
    service.find()
    .then(result => {
        res.status(HttpStatus.OK).json(result);
    })
    .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json({
            error: err.message
        })
    })
})

router.post('/', (req, res) => {
    service.save(req)
    .then(result => {
        res.status(HttpStatus.OK).json(result)
    })
    .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json({
            error: err.message
        })
    })
})

router.patch('/:id', (req, res) => {
    service.updateOne(req)
    .then(result => {
        res.status(HttpStatus.OK).json(result)
    })
    .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json({
            error: err.message
        })
    })
})

router.delete('/:id', (req, res) => {
    service.deleteOne(req.params.id)
    .then(() => {
        res.status(HttpStatus.OK)
        res.send()
    })
    .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json({
            error: err.message
        })
    })
})

module.exports = router