import { NextFunction, Response, Request } from 'express'

import ErrorResponse from '../utils/errorResponse'

import asyncHandler from '../middleware/async'
import User from '../models/User'
import {  IUserDocument } from '../types/User'
import {  ProtectedRequest } from '../types/Auth'





export const createUser = asyncHandler(
  async(req:ProtectedRequest, res:Response, next:NextFunction) => {

    const {fullName,email,phoneNumber,company,countryCode,password,role,isVerifies,isEmailVerified,isPhoneVerified,dob,gender,country,state,city,position,address,turnOver,timeZone,preferredCommunication,isOwner,billingAddress,gst,profileUrl,isFreeOpt,lastActiveDate,langPref,isSubscribed}= req.body


    const emailExist = await User.findOne({email})
    if(emailExist) throw new ErrorResponse('Email already exist',400)

    const phoneExist =await User.findOne({phoneNumber})
    if(phoneExist) throw new ErrorResponse('Phone Number already exist',400)

    const data= await User.create({
      fullName,
      email,
      phoneNumber,
      company,
      countryCode,
      password,
      role,
      isVerifies,
      isEmailVerified,
      isPhoneVerified,
      dob,
      gender,
      country,
      state,
      city,
      position,
      address,
      turnOver,
      timeZone,
      preferredCommunication,
      isOwner,
      billingAddress,
      gst,
      profileUrl,
      isFreeOpt,
      lastActiveDate,
      langPref,
      isSubscribed
                })
    
    res.status(201).json({
      success:true,
      data:data
    })

  }
)






export const getUserDataFromToken = asyncHandler(
  async(req:ProtectedRequest, res:Response, next:NextFunction) => {

    console.log('eeeeeeeeeee')
    
const data:IUserDocument | null = await User.findById(req.user.id)

if(!data) throw new ErrorResponse('failed to get user data',400)

res.status(200).json({
  success:true,
  data:data
})
  }
)




export const signUp = asyncHandler (async(req: Request, res: Response, next: NextFunction)=> {
  
    const { email, password } = req.body;
    console.log('llllllllllll',email,password)
    // Validate email and password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide email and password', 400));
    }
console.log('jjjj')
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    console.log('exisiting ',existingUser)
    if (existingUser) {
      return next(new ErrorResponse('Email already exists', 400));
    }
console.log('hereeeeeeee')
    // Create a new user
    const user:IUserDocument | null = await User.create({
      email,
      password,
      lastActiveDate:Date.now()
      // Other user fields as needed
    });
console.log(user,'this is user data')
if(!user) throw new ErrorResponse('unable to signup',400)

const token = user.getSignedJwtToken()

    res.status(201).json({
      success: true,
      token,
    });
}) 


