import express from 'express';
import auth from './auth'
import post from './post'
import info from './info'

const router = express.Router()

router.use('/auth', auth);
router.use('/post', post)
router.use('/info', info)

router.get('/heart_beat', (req,res) => {
    return res.send('It works!')
})

export default router;