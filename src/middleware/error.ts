import { Request, Response, NextFunction } from 'express'

import { statusResponse } from '../helpers/statusTypes'
import ErrorResponse from '../utils/errorResponse'

const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = statusResponse

const errorHandeler = (
  // eslint-disable-next-line
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction
) => {
  let error: ErrorResponse = { ...err }

  error.message = err.message

  // Log to console for dev
  if (err.name) console.log(err.name)

  // colsole log error
  console.error(err)

  // Mongos bad object ID
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorResponse(message, NOT_FOUND)
  }

  // Mongos duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = new ErrorResponse(message, BAD_REQUEST)
  }

  // Mongos validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      // @ts-ignore
      .map((val) => val.message)
      .join(' && ')
    error = new ErrorResponse(message, BAD_REQUEST)
  }

  // Mongos validation error
  if (err.code === 'ERR_BAD_REQUEST' && !err.response.data.success) {
    const message = err.response.data.error
    error = new ErrorResponse(message, BAD_REQUEST)
  }

  res
    .status(error.statusCode || INTERNAL_SERVER_ERROR)
    .json({ success: false, error: error.message || 'Server Error' })
}

export default errorHandeler
