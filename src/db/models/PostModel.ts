import { PaginationResult, PaginationOptions } from '@/types'
import { Schema, model, Document, Model, Types } from 'mongoose'
import pagination from 'utils/Pagination'

const modelName = 'Post'

export interface IPost {
  title: string
  contributor: Types.ObjectId
  content: string
  likeCount?: number
  createdAt: Date
  updatedAt: Date
}

export interface IPostDocument extends IPost, Document {
  print: () => string
}

export type PaginationPostResult = PaginationResult<IPostDocument>

export interface IPostModel extends Model<IPostDocument> {
  findByTitle: (title: string) => Promise<IPostDocument[]>
  findByContributor: (name: string) => Promise<IPostDocument[]>
  pageByDate: (options?: PaginationOptions) => Promise<PaginationPostResult>
  pageByContributor: (
    constructor: string,
    options: PaginationOptions,
  ) => Promise<PaginationPostResult>
}

const schema = new Schema<IPostDocument, IPostModel>({
  title: {
    type: String,
    required: true,
  },
  content: String,
  likeCount: Number,
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
})

schema.statics.findByTitle = function (title: string) {
  return this.find({ title: new RegExp(title, 'i') })
}

schema.statics.pageByDate = async function (
  { current, size }: PaginationOptions = { current: 1, size: 10 },
): Promise<PaginationResult<IPostDocument>> {
  const globalSize = await this.count()
  const paginationResult = pagination<IPostDocument>(
    { current, size },
    globalSize,
  )
  const list = await this.find()
    .sort('-createdAt')
    .skip(paginationResult.offset as number)
    .limit(size)
  paginationResult.setList(list)
  return paginationResult
}

schema.statics.pageByContributor = async function (
  constructor: string,
  { current, size }: PaginationOptions,
): Promise<PaginationPostResult> {
  const globalSize = await this.count()
  const paginationResult = pagination<IPostDocument>(
    { current, size },
    globalSize,
  )
  paginationResult.setList(
    await this.find({ contributor: new RegExp(constructor, 'i') })
      .sort('-createdAt')
      .skip(paginationResult.offset as number)
      .limit(size),
  )
  return paginationResult
}

schema.statics.findByConstructor = function (name: string) {
  return this.find({ contributor: new RegExp(name, 'i') })
}

schema.methods.print = function () {
  return `${this.title}\n${this.content}`
}

export default model<IPostDocument, IPostModel>(modelName, schema)
