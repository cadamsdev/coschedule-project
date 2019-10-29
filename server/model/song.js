const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    _id: Number,
    wrapperType: String,
    kind: String,
    artistId: Number,
    collectionId: Number,
    trackId: Number,
    artistName: String,
    collectionName: String,
    trackName: String,
    collectionCensoredName: String,
    trackCensoredName: String,
    artistViewUrl: String,
    collectionViewUrl: String,
    trackViewUrl: String,
    previewUrl: String,
    artworkUrl30: String,
    artworkUrl60: String,
    artworkUrl100: String,
    collectionPrice: Number,
    trackPrice: Number,
    releaseDate: String,
    collectionExplicitness: String,
    trackExplicitness: String,
    discCount: Number,
    discNumber: Number,
    trackCount: Number,
    trackNumber: Number,
    trackTimeMillis: Number,
    country: String,
    currency: String,
    primaryGenreName: String,
    isStreamable: Boolean
})

const Song = mongoose.model('Song', songSchema);

module.exports = Song