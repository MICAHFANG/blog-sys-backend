import { Schema, model, Document, Model, Types, ObjectId } from 'mongoose'

const modelName = 'Post'

export interface IPost {
  title: string
  contributor: ObjectId
  content: string
  likeCount?: number
  createdAt: Date
  updatedAt: Date
}

export interface IPostDocument extends IPost, Document {
  print: () => string
}

export interface IPostModel extends Model<IPostDocument> {
  findByTitle: (title: string) => Promise<IPostDocument[]>
  findByContributor: (name: string) => Promise<IPostDocument[]>
}

const schema = new Schema<IPostDocument, IPostModel>({
  title: {
    type: String,
    required: true,
  },
  contributor: {
    type: Types.ObjectId,
    immutable: true,
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

schema.statics.findByContributor = function (name: string) {
  return this.find({ contributor: new RegExp(name, 'i') })
}

schema.methods.print = function () {
  return `${this.title}\n${this.content}`
}

export default model<IPostDocument, IPostModel>(modelName, schema)
