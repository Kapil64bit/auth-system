// @ts-ignore
import otpGenerator from 'otp-generator'
import { Response, NextFunction } from 'express'

import ErrorResponse from './errorResponse'

import User from '../models/User'
import { IUserDocument } from '../types/User'
import { ProtectedRequest } from '../types/Auth'

import mongoose from 'mongoose'


export const sendTokenResponse = async (
  user: IUserDocument,
  isSignup: boolean | null,
  statusCode: number,
  res: Response,
) => {
  user.lastActiveDate = new Date()
  await user.save()
  const token = await user.getSignedJwtToken()
  const result = {
    statusCode: statusCode,
    success: true,
    token,
    ...(isSignup !== null && { isSignup }),
    // ...(isFirstLogin !== undefined && { isFirstLogin }),
  }
  return result
}