export interface PaginationOptions {
  current: number = 1
  size: number = 10
}

export interface PaginationResult<T> {
  list: T[]
  hasNext: boolean
  hasPrev: boolean
  current: number
  size: number
}
