import { Request } from 'express'

import { IUserDocument } from './User'

export const UserTypes = {
  USER: 'USER',
  ADMIN_USER: 'ADMIN_USER',
}

export interface ProtectedRequest extends Request {
  user: IUserDocument
}

export interface ITokenDecode {
  id: string
}

export interface IJwtDecodeToken {
  userType: string
}


export interface getSignedArgs{
  purpose?:string,
  secretKeyField:string
}