const { Router } = require('express')
const router = new Router()
const service = require('../service/comment.service')
const HttpStatus = require('http-status-codes')

router.get('/', (req, res) => {
    service.find()
    .then((response) => {
        res.status(HttpStatus.OK).json(response);
    })
    .catch((error) => {
        response.status(HttpStatus.BAD_REQUEST)
        response.send(error.response)
    })
})

router.post('/', (req, res) => {
    service.save(req)
    .then(() => {
        res.status(HttpStatus.OK)
        res.send()
    })
    .catch((err) => {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(err)
    })
})

router.delete('/:id', (req, res) => {
    service.deleteOne(req.params.id)
    .then(() => {
        res.status(HttpStatus.OK)
        res.send()
    })
    .catch((err) => {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(err)
    })
})

module.exports = router