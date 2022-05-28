import pagination, { PaginationResult } from './Pagination'

export interface IROptions {
  data?: any
  code: number
  message: string
}

export default class R {
  private data: any
  private code: number
  private message: string

  constructor(
    { data, code, message }: IROptions = {
      data: {},
      code: 0,
      message: 'okay',
    },
  ) {
    this.data = data
    this.code = code
    this.message = message
  }

  static error(): R
  static error(message: string): R
  static error(message: string, code: number): R
  static error(message?: string, code?: number): R {
    const r = new R({ data: null, code: 1, message: 'error' })
    if (message) r.setMessage(message)
    if (code) r.setCode(code)
    return r
  }

  static okay(): R
  static okay(data: any): R
  static okay(data?: any) {
    const r = new R()
    if (data) r.setData(data)
    return r
  }

  public setData(data: { key: string; value: any }): R
  public setData(data: any): R
  public setData(data: { key: string; value: any } | any): R {
    if (Object.keys(data).length === 1 && data.key) {
      const { key, value } = data
      this.data[key] = value
    } else {
      // if data instanceof Patination, hide field offset
      if (data instanceof PaginationResult) {
        delete data.offset
      }
      this.data = Object.assign(this.data, data)
    }
    return this
  }

  public setMessage(message: string): R {
    this.message = message
    return this
  }

  public setCode(code: number): R {
    this.code = code
    return this
  }
}
