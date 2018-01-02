import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

const Account = new Schema({
    id: String,
    pw: String,
    email: String,
    name: String
})

Account.methods.generateHash = function(pw){
    return bcrypt.hashSync(pw, 8)
}
Account.methods.compareHash = function(pw){
    return bcrypt.compareSync(pw, this.pw)
}

Account.statics.findId = function(id) {
    return this.findOne({"id": id}).exec()
}

Account.statics.idTo_Id = function(id){
    return this.findOne({"id": id}, {"_id": true}).exec()
}

Account.statics.findEmail = function (email) {
    return this.findOne({"email": email}).exec()
}

export default mongoose.model('Account', Account)