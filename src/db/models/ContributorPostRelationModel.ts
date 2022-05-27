/**
 * @author Micah Fang
 * @date   2022-05-27 22:16:42
 * 贡献者与Post关系Model
 */

const modelName = ''

import { ObjectId, Schema, Document, model, Types } from 'mongoose'
import ContributorModel from './ContributorModel'
import PostModel from './PostModel'

export interface IContributorPostRelation {
  contributorObjectId: ObjectId
  postObjectId: ObjectId
  isAuthor: Boolean
  contributionPoints: Number
}

export interface IContributorPostRelationModel
  extends IContributorPostRelation,
    Document {}

const schema = new Schema<IContributorPostRelation>({
  // ref to `ContributorModel`
  contributorObjectId: {
    type: Types.ObjectId,
    ref: ContributorModel,
    required: true,
  },
  // ref to `PostModel`
  postObjectId: {
    type: Types.ObjectId,
    ref: PostModel,
    required: true,
  },
  contributionPoints: {
    type: Number,
    min: 0,
    max: 99,
    default: 0,
  },
  isAuthor: {
    type: Boolean,
    default: false,
  },
})

export default model(modelName, schema)
