import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Post = new Schema({
    asker: {type: Schema.Types.ObjectId, default: null},
    replier: Schema.Types.ObjectId,
    question: String,
    answer: {type: String, default: undefined},
    replied: {type: Boolean, default: false},
    time: {type: Date, default: Date.now}
})

Post.statics.answered = function (replier) {
    return this.find({$and: [{"replier": replier}, {"replied": true}]}, {"question": true, "answer": true, "replier": true, "time": true}).sort({"_id": -1}).exec()
}
Post.statics.nonAnswered = function (replier) {
    return this.find({$and: [{"replier": replier}, {"replied": false}]}, {"question": true, "answer": true, "replier": true, "time": true}).sort({"_id": -1}).exec()
}

export default mongoose.model('Post', Post)