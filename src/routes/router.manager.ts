
import express from 'express'

const router = express.Router()

import userRouter from '../routes/user'

import auth from './auth'
import user from './user'


router.use('/v1/auth', auth)

router.use('/v1/user', user)

export default router
