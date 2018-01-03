import express from 'express'
import Post from '../models/Post'
import Account from '../models/Account'
import mongoose from 'mongoose'
import Joi from 'joi'

const router = express.Router()

router.post('/', (req, res) => {
    const body = req.body

    const schema = Joi.object().keys({
        question: Joi.string().min(1).max(300).required()
    })

    const result = Joi.validate({ question: body.question }, schema)
    if (result.error) {
        return res.status(400).json({
            code: 0
        })
    }




    Account.findId(req.body.replier).then(user => {
        if (!user) {
            return res.status(404).json({
                code: 2
            })
        }

        let post = new Post({
            replier: user._id,
            question: body.question
        })

        if (!typeof req.session.loginInfo === "undefined") {
            post.asker = req.session.loginInfo._id
        }

        post.save(err => {
            if (err) throw err;
            return res.json({ success: true })
        })

    }).catch(err => { throw err })
})

router.post('/reply', (req, res) => {
    const schema = Joi.object().keys({
        _id: Joi.string().required(),
        answer: Joi.string().min(1).max(300).required()
    })
    const result = Joi.validate({ _id: req.body.id, answer: req.body.answer }, schema)

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

    Post.findOne({ "_id": req.body.id }).exec().then(post => {
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
        post.answer = req.body.answer
        post.replied = true

        post.save((err, post) => {
            if (err) throw err
            return res.json({
                success: true
            })
        })
    }).catch(err => {
        throw err
    })
})

router.post('/remove', (req, res) => {

    const schema = Joi.object().keys({
        id: Joi.string().required()
    })

    const result = Joi.validate({ id: req.body.id }, schema)
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

    Post.findById(req.body.id).exec().then(post => {
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
        Post.remove({ _id: req.body.id }, err => {
            if (err) throw err;
            res.json({ success: true })
        })
    }).catch(err => { throw err })
})

router.post('/id', (req, res) => {
    const schema = Joi.object().keys({
        id: Joi.string().min(3).max(10).required()
    })
    const result = Joi.validate({ id: req.body.id }, schema)
    if (result.error) {
        return res.status(400).json({
            code: 0
        })
    }
    let _id = undefined
    Account.idTo_Id(req.body.id).then(user => {
        if (!user) {
            return res.status(404).json({
                code: 1
            })
        }
        _id = user._id

        if (req.body.aw === true) {
            Post.answered(_id).then(posts => {
                return res.json(posts)
            }).catch(err => {
                throw err
            })
        } else {
            Post.nonAnswered(_id).then(posts => {
                return res.json(posts)
            }).catch(err => {
                throw err
            })
        }


    })
})


export default router