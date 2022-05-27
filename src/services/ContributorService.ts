import { Request, Response } from 'express'
import ContributorModel from 'models/ContributorModel'
import R from 'utils/R'

// 展示文章的前五位贡献者
export const topFiveContributorForPost = (
  req: Request<{ postObjectId: string }>,
  res: Response,
) => {}

// 创建贡献者
export type ContributorCreatorReqBodyGeneric = {
  name: string
  email: string
}
export const createContributor = async (
  req: Request<{}, any, ContributorCreatorReqBodyGeneric>,
  res: Response,
) => {
  const { name, email } = req.body
  const contributorDoc = await ContributorModel.create({ name, email })
  if (contributorDoc) {
    res.json(R.okay({ name, email }))
  } else {
    res.json(R.error('create contributor failed', 11001))
  }
}
