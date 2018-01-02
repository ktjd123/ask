import express from 'express'
import Joi from 'joi'
import Account from '../models/Account'

const router = express.Router()

router.post('/login', (req, res) => {
    const body = req.body
    const schema = Joi.object().keys({
        id: Joi.string().alphanum().min(3).max(10).required(),
        pw: Joi.string().alphanum().min(5).max(20).required()
    })

    const result=Joi.validate({id: body.id, pw: body.pw}, schema)

    if(result.error){
        return res.status(400).json({
            code: 0
        })
    }

    Account.findId(body.id)
    .then(user => {
        if(!user){
            return res.status(404).json({
                code: 1
            })
        }

        if(!user.compareHash(body.pw)){
            return res.status(401).json({
                code: 2
            })
        }
        let session = req.session;
        session.loginInfo = {
            _id: user._id,
            id: user.id,
            name: user.name
        }
        return res.json({
            success: true
        })
    })
    .catch(err => {
        throw err;
    })
})

router.post('/register', (req,res) => {
    const body = req.body
    const schema = Joi.object().keys({
        id: Joi.string().alphanum().min(3).max(10).required(),
        pw: Joi.string().alphanum().min(5).max(20).required(),
        name: Joi.string().min(1).max(5).required(),
        email: Joi.string().email().required()
    })
    const result=Joi.validate({id: body.id, pw: body.pw, name: body.name, email: body.email}, schema)
    if(result.error){
        return res.status(400).json({
            code: 0
        })
    }

    Account.findId(body.id)
    .then( user => {
        if(user){
            return res.status(401).json({
                code: 1
            })
        }
        Account.findEmail(body.email)
        .then(user => {
            if(user){
                return res.status(401).json({
                    code: 2
                })
            }
            let account = new Account({
                id: body.id,
                pw: body.pw,
                name: body.name,
                email: body.email
            })

            account.pw = account.generateHash(account.pw)

            account.save(err => {
                if(err) throw err;
                return res.json({success: true})
            })
        })
        .catch(err => {throw err})
    })
    .catch(err => {
        throw err
    })
})

router.get('/getinfo', (req,res) => {
    if(typeof req.session.loginInfo === 'undefined'){
        return res.status(401).json({
            code: 1
        })
    }
    res.json({
        info: req.session.loginInfo
    })
})

router.post('/logout', (req,res) => {
    req.session.destroy(err => {throw err})
    return res.json({success: true})
})

export default router