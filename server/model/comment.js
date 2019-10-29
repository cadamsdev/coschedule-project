const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    msg: String,
    trackId: Number
})

const Comment = mongoose.model('Comment', schema);

module.exports = Comment