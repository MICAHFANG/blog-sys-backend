import { Router, RouterOptions } from 'express'

const postRouter = Router()

// 查询前十条post
postRouter.get('/', (req, res) => {})

// 指定id查询
postRouter.get('/:id', (req, res) => {
  res.send(req.params)
})

export default postRouter
