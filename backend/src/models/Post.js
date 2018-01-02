import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Post = new Schema({
    asker: Schema.Types.ObjectId,
    replier: Schema.Types.ObjectId,
    question: String,
    answer: {type: String, default: undefined},
    replied: {type: Boolean, default: false},
    time: {type: Date, default: Date.now}
})

Post.statics.posts = function (replier) {
    return this.find({"replier": replier}, {"_id": false, "asker": false, "replier": true, "answer": true, "time": true, "replied": true}).sort({"_id": -1}).exec()
}

export default mongoose.model('Post', Post)