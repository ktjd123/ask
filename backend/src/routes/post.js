import express from 'express'
import Post from '../models/Post'
import Account from '../models/Account'
import mongoose from 'mongoose'
import Joi from 'joi'

const router = express.Router()

router.post('/', (req, res) => {
    const body = req.body

    const schema = Joi.object().keys({
        replier: Joi.string().required(),
        question: Joi.string().min(1).max(300).required()
    })

    const result = Joi.validate({ replier: body.replier, question: body.question }, schema)
    if (result.error) {
        return res.status(400).json({
            code: 0
        })
    }

    if (typeof req.session.loginInfo === "undefined") {
        return res.status(403).json({
            code: 1
        })
    }

    Account.findId(body.replier).then(user => {
        if (!user) {
            return res.status(404).json({
                code: 2
            })
        }

        let post = new Post({
            asker: req.session.loginInfo._id,
            replier: user._id,
            question: body.question
        })

        post.save(err => {
            if (err) throw err;
            return res.json({ success: true })
        })

    }).catch(err => { throw err })
})

router.put('/:id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            code: 0
        })
    }
    const schema = Joi.object().keys({
        reply: Joi.string().min(1).max(300).required()
    })
    const result = Joi.validate({ reply: req.body.reply }, schema)

    if (result.error) {
        return res.status(400).json({
            code: 0
        })
    }

    if (typeof req.session.loginInfo === "undefined") {
        return res.status(403).json({
            code: 1
        })
    }

    Post.findById(req.params.id).exec().then(post => {
        if (!post) {
            return res.status(404).json({
                code: 2
            })
        }

        if (post.replier != req.session.loginInfo._id) {
            return res.status(403).json({
                code: 3
            })
        }

        post.answer = req.body.reply;
        post.replied = true

        post.save((err, post) => {
            if(err) throw err;
            return res.json({
                success: true,
                post
            })
        })

    }).catch(err => { throw err })
})

router.delete('/:id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            code: 0
        })
    }
    if (typeof req.session.loginInfo === "undefined") {
        return res.status(403).json({
            code: 1
        })
    }
    Post.findById(req.params.id).exec().then(post => {
        if (!post) {
            return res.status(404).json({
                code: 2
            })
        }
        if (post.replier != req.session.loginInfo._id) {
            return res.status(403).json({
                code: 3
            })
        }
        Post.remove({ _id: req.params.id }, err => {
            if (err) throw err;
            res.json({ success: true })
        })
    }).catch(err => { throw err })
})

router.get('/', (req, res) => {
    Post.posts(req.body._id).then(posts => {
        return res.json(posts)
    })
})

export default router