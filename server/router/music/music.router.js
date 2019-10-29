const { Router } = require('express')
const router = new Router()
const service = require('../../service/music.service')
const HttpStatus = require('http-status-codes')

router.get('/', (req, res) => {
    service.find(req.query)
    .then((response) => {
        res.send(response.data.results);
    })
    .catch((error) => {
        response.status(HttpStatus.BAD_REQUEST)
        response.send(error.response)
    })
})

module.exports = router