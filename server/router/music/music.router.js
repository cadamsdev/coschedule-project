const { Router } = require('express')
const router = new Router()
const service = require('../../service/music.service')
const HttpStatus = require('http-status-codes')
const Song = require('../../model/song')

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

router.post('/favorite', (req, res) => {
    const song = new Song({
        _id: req.body.trackId,
        wrapperType: req.body.wrapperType,
        kind: req.body.kind,
        artistId: req.body.artistId,
        collectionId: req.body.collectionId,
        trackId: req.body.trackId,
        artistName: req.body.artistName,
        collectionName: req.body.collectionName,
        trackName: req.body.trackName,
        collectionCensoredName: req.body.collectionCensoredName,
        trackCensoredName: req.body.trackCensoredName,
        artistViewUrl: req.body.artistViewUrl,
        collectionViewUrl: req.body.collectionViewUrl,
        trackViewUrl: req.body.trackViewUrl,
        previewUrl: req.body.previewUrl,
        artworkUrl30: req.body.artworkUrl30,
        artworkUrl60: req.body.artworkUrl60,
        artworkUrl100: req.body.artworkUrl100,
        collectionPrice: req.body.collectionPrice,
        trackPrice: req.body.trackPrice,
        releaseDate: req.body.releaseDate,
        collectionExplicitness: req.body.collectionExplicitness,
        trackExplicitness: req.body.trackExplicitness,
        discCount: req.body.discCount,
        discNumber: req.body.discNumber,
        trackCount: req.body.trackCount,
        trackNumber: req.body.trackNumber,
        trackTimeMillis: req.body.trackTimeMillis,
        country: req.body.country,
        currency: req.body.currency,
        primaryGenreName: req.body.primaryGenreName,
        isStreamable: req.body.isStreamable
    })

    song.save().then(result => {
        console.log(result)
        res.status(HttpStatus.OK)
        res.send()
    })
    .catch(err => {
        console.log(err)
        res.status(HttpStatus.BAD_REQUEST)
        res.send(err)
    })
})

module.exports = router