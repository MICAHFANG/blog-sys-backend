// import module-alias to use path like @/ or other alias
import 'module-alias/register'
import 'dotenv/config'
import express from 'express'
import postRouter from 'routers/PostRouter'
import Connect from '@/db/Connect'
import logger from 'utils/Logger'

const PREFIX = '/api/v1'
const app = express()
app.use(`${PREFIX}/post`, postRouter)
app.listen(3333, async () => {
  logger.info('start server at port 3333 success.')
  try {
    await Connect()
    logger.info('connect mongodb success.')
  } catch (e) {
    logger.error(e)
  }
})
