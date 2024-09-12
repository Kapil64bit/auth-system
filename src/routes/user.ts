import express, { Request } from 'express'

import {createUser, getUserDataFromToken} from '../controllers/user'
import { authorize, protect } from '../middleware/auth'

import User from '../models/User'

const router = express.Router()

router.route('/me').get(protect,getUserDataFromToken)




export default router