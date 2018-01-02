import express from 'express'
import Joi from 'joi'
import Account from '../models/Account'

const router = express.Router()

//send information about that page
router.post('/', (req,res) => {
    const id = req.body.id
    const schema = Joi.object().keys({
        id: Joi.string().min(3).max(10).required()
    })

    const result = Joi.validate({id: id}, schema)
    if(result.error){
        return res.status(400).json({
            code: 0
        })
    }

    Account.findId(req.body.id).then(user => {
        if(!user){
            return res.status(404).json({
                code: 1
            })
        }
        return res.json({
            user
        })
    }).catch(err => {
        throw err
    })
})


export default router