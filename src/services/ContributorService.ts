import { Request, Response } from 'express'

// 展示文章的前五位贡献者
export const topFiveContributorForPost = (
  req: Request<{ postObjectId: string }>,
  res: Response,
) => {}
