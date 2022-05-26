import { Document } from 'mongoose'
import {
  PaginationOptions,
  PaginationResult as IPaginationResult,
} from '@/types'

class PaginationResult<T extends Document> implements IPaginationResult<T> {
  size: number
  current: number
  offset: number
  global: number
  next: number | undefined
  prev: number | undefined
  hasNext: boolean
  hasPrev: boolean
  list: T[] = []

  constructor(options: IPaginationResult<T>, offset: number) {
    this.size = options.size
    this.current = options.current
    this.offset = options.size
    this.global = options.global
    this.next = options.next
    this.prev = options.prev
    this.hasNext = options.hasNext
    this.hasPrev = options.hasPrev
    this.list = []
    this.offset = offset
  }

  public setList(list: T[]) {
    this.list = [...this.list, ...list]
  }
}

function pagination<T extends Document>(
  { current, size }: PaginationOptions,
  globalCount: number,
): PaginationResult<T> {
  const offset = size * (current - 1)
  const global = Math.ceil(globalCount / size)
  const hasNext = global > current * size
  const hasPrev = current > 1
  const paginationResult = new PaginationResult(
    {
      size,
      current,
      global,
      next: hasNext ? current + 1 : undefined,
      prev: hasPrev ? current - 1 : undefined,
      hasNext,
      hasPrev,
      list: [],
    },
    offset,
  )
  return paginationResult
}

export default pagination
