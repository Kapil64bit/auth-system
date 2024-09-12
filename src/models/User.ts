import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserDocument } from '../types/User';

const UserSchema = new   
 Schema({
  email: {
    type: String,
    trim: true,
    index: true,
    lowercase: true,
    required: [true, 'Please Provide Email'],
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'Please Provide Password'],
    select: false, // This will not return password when fetching user data
  },
  lastActiveDate:{
    type:Date,
    default:new Date()
  }
});


// Encrypt password using bcrypt
UserSchema.pre<IUserDocument>(
  'save',
  async function (this: IUserDocument, next) {
    if (!this.isModified('password')) next()

    if (this.password) {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
    }
  }
)

// Get web token
UserSchema.methods.getSignedJwtToken = function (this: IUserDocument) {
  // eslint-disable-next-line
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  })
}


// Match user Entered password to hash password in db
UserSchema.methods.matchPassword = async function (
  this: IUserDocument,
  enteredPassword: string
) {
  if (this.password) return await bcrypt.compare(enteredPassword, this.password)
  else return false
}

UserSchema.index({
  phoneNumber: 1,
})

export default model<IUserDocument>('User', UserSchema)
