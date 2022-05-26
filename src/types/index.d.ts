import { Document } from 'mongoose'
export interface PaginationOptions {
  current: number = 1
  size: number = 10
}

export interface PaginationResult<T extends Document> {
  list?: T[]
  size: number
  current: number
  hasNext: boolean
  hasPrev: boolean
  next: number | undefined
  prev: number | undefined
  global: number
}
