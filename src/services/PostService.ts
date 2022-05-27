/**
 * @author Micah Fang
 * @date   2022-05-24 15:31:40
 */

import { Request, Response } from 'express'
import ContributorModel from 'models/ContributorModel'
import PostModel from 'models/PostModel'
import R from 'utils/R'

// 按照日期查询前十条
export async function topTen(req: Request, res: Response) {
  const paginationResult = await PostModel.pageByDate()
  const r = R.okay().setData(paginationResult)
  res.json(r)
}

// 分页查询方法
export async function pagingQuery(
  req: Request<{ size: string } & { current: string }>,
  res: Response,
) {
  let { size, current } = req.params
  current = current && '1'
  const paginationResult = await PostModel.pageByDate({
    current: parseInt(current, 10),
    size: parseInt(size, 10),
  })
  const r = R.okay(paginationResult)
  res.json(r)
}

// 按照id查询一条数据
export async function queryById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params
  const doc = await PostModel.findById(id).lean()
  const r = R.okay().setData(doc)
  res.json(r)
}

// 按贡献者分页查询
export async function paginationQueryByContributor(
  req: Request<{ size: string; current: string; contributor: string }>,
  res: Response,
) {
  const { size, current, contributor } = req.params
  const paginationResult = await PostModel.pageByContributor(contributor, {
    size: parseInt(size, 10),
    current: parseInt(current, 10),
  })
  const r = R.okay().setData(paginationResult)
  res.json(r)
}

// 创建post
export type PostCreatorReqBodyGeneric = {
  title: string
  content: string
  author: string
}
export async function createPost(
  req: Request<{}, any, PostCreatorReqBodyGeneric>,
  res: Response,
) {
  const { title, content, author } = req.body
  // // 检查author是否存在
  const authorObject = await ContributorModel.getByName(author)
  if (!authorObject) {
    return authorNotExist(author, res)
  }
}

function authorNotExist(name: string, res: Response) {
  const r = R.error(`author "${name}" is not exist`, 10001)
  res.json(r)
}
