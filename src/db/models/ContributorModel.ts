/**
 * @author Micah Fang
 * @date   2022-05-27 22:40:54
 */
import mongoose, { Schema, model, Model } from 'mongoose'

const modelName = 'Contributor'

export interface IContributor {
  name: String
  email: String
  joinedAt: Date
}

export interface IContributorDocument extends IContributor, mongoose.Document {}

export interface IContributorModel extends Model<IContributorDocument> {
  getByName: (name: string) => Promise<IContributorDocument>
}

const schema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    type: String,
  },
  joinedAt: {
    type: Date,
    default: () => Date.now(),
  },
})

schema.statics.getByName = function (name: string) {
  return this.findOne({ name })
}

schema.pre('save', function (next) {
  const emailRegExp = /([a-z]|[A-Z]|\d|\.){3,64}@\w+\.\w+/
  if (!emailRegExp.test(this.email)) {
    throw new Error('邮件格式错误')
  }
  next()
})

export default model<IContributorDocument, IContributorModel>(modelName, schema)
