import R from 'utils/R'
import { Router } from 'express'
import PostModel, { IPostDocument } from '@/db/models/PostModel'
import { PaginationResult } from '@/types'

const postRouter = Router()

// 查询前十条post
postRouter.get('/page', async (req, res) => {
  const posts = await PostModel.pageByDate()
  const result = {
    list: posts,
    hasNext: false,
  } as PaginationResult<IPostDocument>
  const r = R.okay().setData(result)
  res.json(r)
})

// 指定id查询
postRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const doc = await PostModel.findById(id).lean()
  const r = R.okay().setData(doc)
  res.json(r)
})

export default postRouter
