import express from 'express'
import Account from '../models/Account';
import Post from '../models/Post';

const router = express.Router()

router.post('/', (req,res) => {
    if(!req.session.loginInfo.id === "ktjd123"){
        return res.status(403).json({
            code: 1
        })
    }
    let accounts = 0
    let posts = 0
    Account.count().exec().then(count => {
        accounts = count
        Post.count().exec().then(count => {
            posts = count
            return res.json({
                account: accounts,
                post: posts
            })
        })
    })
})

export default router