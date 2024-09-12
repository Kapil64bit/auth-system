import { Request, Response, NextFunction } from 'express'
import asyncHandler from '../middleware/async'
// @ts-ignore
import {
  sendTokenResponse,

} from '../utils/auth'
import ErrorResponse from '../utils/errorResponse'
import User from '../models/User'

import { Model as IModel } from 'mongoose'
import {  ProtectedRequest } from '../types/Auth'
import {IUserDocument} from '../types/User'


export const Login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { identifier, password } = req.body

    let Model: typeof IModel = User

    if (!identifier)
      return next(
        new ErrorResponse('Please Provide Phone Number or Email', 400)
      )
    if (!password) return next(new ErrorResponse('password required', 400))

    const identifierType = identifier.includes('@') ? 'email' : 'phoneNumber'

    // Check for user
    const user = await Model.findOne({ [identifierType]: identifier }).select(
      '+password'
    )
    if (!user)
      return next(new ErrorResponse('User not found with this email', 404))
    if (user.isDisabled)
      return next(
        new ErrorResponse(
          'This user is disabled please, connect admin for more details',
          401
        )
      )
    // if ( !['ADMIN','BUSINESS'].includes(user.role) ) return next(new ErrorResponse('This login is for Admins only', 401))

    // Check if password is match
    const isMatch = await user.matchPassword(password)
    if (!isMatch) return next(new ErrorResponse('Invalid Credentials', 401))

    const result = await sendTokenResponse(user, null, 200, res)
    res.status(200).json({
      success: true,
      message: 'login successful',
      token: result.token,
    })
  }
)