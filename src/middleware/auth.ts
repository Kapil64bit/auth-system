import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from './async'
import ErrorResponse from '../utils/errorResponse'
import mongoose, { Model as model } from 'mongoose'

import User from '../models/User'

import { ProtectedRequest, ITokenDecode, getSignedArgs } from '../types/Auth'
import { IUserDocument } from '../types/User'
// import { rateLimit } from 'express-rate-limit'

export const protect = asyncHandler(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      token = req.headers.authorization.split(' ')[1]
console.log('this is the token',)
    if (!token)
      return next(new ErrorResponse('Please login first to use this feature', 401))

    try {
      // Verify token
      console.log('decoded',token, process.env.JWT_SECRET)
      const decoded = jwt.verify(token, process.env.JWT_SECRET!)
      console.log('decoded2',token, process.env.JWT_SECRET) // eslint-disable-line
      let Model:typeof model = User
      console.log('here after token check')
      // Currently Loged in User
      const user: IUserDocument  | null = await Model.findById(
        (<ITokenDecode>decoded).id
      ).select('+password')

      if (!user) return next(new ErrorResponse('User Not found', 404))

      user.lastActiveDate = new Date()
      await user.save()
      delete user.password
      req.user = user

      next()
    } catch (err) {
      return next(new ErrorResponse('Please login first to use this feature', 401))
    }
  }
)

// Grant access to specofoc roles
export const authorize = (...roles: [string]) => {
  return (req: ProtectedRequest, res: Response, next: NextFunction) => {
    if (req.user) {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorResponse(
            `User role ${req.user.role} is not authorized to access this route`,
            403
          )
        )
      }
      next()
    } else {
      return next(
        new ErrorResponse(
          'This API is only applicable only Protected routes',
          401
        )
      )
    }
  }
}

// const limiter = rateLimit({
//   windowMs: 1440 * 60 * 1000, // 1 Day
//   max: 10, // Limit each IP to 10 requests per `window` (here, per 1 day)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   message: 'Too many requests, please try again later.',
// })

// export const rateLimiterforMobile = asyncHandler(
//   async (req: ProtectedRequest, res: Response, next: NextFunction) => {
//     // console.log(req.body)
//     if (req.body.phoneNumber) return limiter(req, res, next)
//     next()
//   }
// )
