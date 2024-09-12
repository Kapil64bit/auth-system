import { Document } from 'mongoose';

export const UserRoles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export interface IUser {
  email: string;
  password?: string;
  role: 'USER' | 'ADMIN'; // You can remove role if not needed
}

export interface IUserDocument extends IUser, Document {
  matchPassword(enteredPassword: string): boolean;
  getSignedJwtToken(): string;
  lastActiveDate:Date
}