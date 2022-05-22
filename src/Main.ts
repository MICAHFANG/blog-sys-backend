// import module-alias to use path like @/ or other alias
import 'module-alias/register'
import 'dotenv/config'
import express from 'express'
import postRouter from 'routers/PostRouter'
import Connect from '@/db/Connect'
import logger from 'utils/Logger'
import PostModel from 'models/PostModel'

const app = express()

app.use('/post', postRouter)

app.listen(3333, async () => {
  logger.info('start server at port 3333 success.')
  await Connect()
  logger.info('connect mongodb success.')
  const newPost = new PostModel({
    title: 'Hello World',
    content: 'This is the first post.',
  })
  console.log(newPost.print())
})
