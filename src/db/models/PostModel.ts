import { Schema, model, Document, Model } from 'mongoose'

const modelName = 'Post'

export interface IPost {
  title: string
  contributor: string
  content: string
  likeCount: number
}

export interface IPostDocument extends IPost, Document {
  print: () => string
}

export interface IPostModel extends Model<IPostDocument> {
  findByTitle: (title: string) => Promise<IPostDocument[]>
}

const schema = new Schema({
  title: String,
  contributor: String,
  content: String,
  likeCount: Number,
})

schema.statics.findByTitle = function (title: string) {
  return this.find({ title: new RegExp(title, 'i') })
}

schema.methods.print = function () {
  return `${this.title}\n${this.content}`
}

export default model<IPostDocument, IPostModel>(modelName, schema)
