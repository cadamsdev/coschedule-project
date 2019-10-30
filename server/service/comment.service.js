const Comment = require('../model/comment')
const mongoose = require('mongoose')

function find() {
    return Comment.find().exec()
}

function save(req) {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        msg: req.body.msg,
        trackId: req.body.trackId
    })

    return comment.save()
}

function deleteOne(id) {
    return Comment.deleteOne({
        _id: id
    })
    .exec()
}

function updateOne(req) {
    return Comment.updateOne(
    {
        _id: req.params.id
    },
    {
        $set: {
            msg: req.body.msg
        }
    })
    .exec()
}

exports.find = find
exports.save = save
exports.deleteOne = deleteOne
exports.updateOne = updateOne