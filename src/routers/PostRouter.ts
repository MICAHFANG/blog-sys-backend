/**
 * @author Micah Fang
 * @date   2022-05-24 15:31:42
 */
import { Router } from 'express'
import {
  pagingQuery,
  paginationQueryByContributor,
  queryById,
  topTen,
  createPost,
} from 'services/PostService'

const postRouter = Router()

// 查询前十条post
postRouter.get('/page', topTen)

// 分页查询，数量和页数
postRouter.get('/page/:size/:current', pagingQuery)

// 指定id查询
postRouter.get('/:id', queryById)

// 按贡献者分页查询
// postRouter.get('/contributor/:contributor/:size/:current', paginationQueryByContributor)

// 创建post
postRouter.put('/', createPost)

export default postRouter
