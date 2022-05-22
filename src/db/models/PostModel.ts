import { Schema, model } from 'mongoose'

const modelName = 'Post'

const schema = new Schema({
  title: String,
  contributor: String,
  content: String,
  likeCount: Number,
})

schema.methods.print = function () {
  return `${this.title}\n${this.content}`
}

export default model(modelName, schema)
