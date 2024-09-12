import dotenv from 'dotenv'
import { IUserDocument } from '../types/User'
import { IPaginationResults } from '../types/Pagination'

declare global {
  namespace Express {
      interface Request {
        user: IUserDocument
      }
    interface Response {
      paginationResult: IPaginationResults
    }
  }
}


dotenv.config({ path: __dirname + '/config.env' }) // this needs to be defined here so that all imports can get access to env

if (process.env.NODE_ENV === 'development')
  console.log('Initialize app settings')
