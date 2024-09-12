import express from 'express'
import {
  Login
} from '../controllers/auth'
import {  protect } from '../middleware/auth'
import { createUser, getUserDataFromToken, signUp } from '../controllers/user'

const router = express.Router()

router.route('/login').post(Login)
router.route('/me').get(protect,getUserDataFromToken)

router.route('/').post(createUser)

router.route('/signup').post(signUp)



export default router
