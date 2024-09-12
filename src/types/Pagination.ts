import { Response } from 'express'
export interface IPaginationField {
  next?: {
    page: number
    limit: number
  }
  prev?: {
    page: number
    limit: number
  }
}

export interface IPaginationResults {
  success: boolean
  count: number
  pagination: IPaginationField
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}
export interface IPaginationResultsResponse extends Response {
  paginationResult: IPaginationResults
}

export interface IPaginationParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any
  populate?: string
  findExp?: {
    isDisabled?: boolean
    objectType?: string
    isActive?:boolean
    isPublished?: boolean
    isSubscribed?: boolean
  }
  select?: string
  isSelfExp?: boolean
  reverse?: boolean
  callback?: Function
}

export interface IPaginationQuery {
  find: Function
  select: Function
  sort: Function
  skip: Function
  limit: Function
  populate: Function
}
