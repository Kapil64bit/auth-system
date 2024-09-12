import ErrorResponse from '../utils/errorResponse'

export interface IError extends ErrorResponse {
  value: string
  code: number
  errors: object
}
