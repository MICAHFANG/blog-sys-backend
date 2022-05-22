// import module-alias to use path like @/ or other alias
import 'module-alias/register'
import 'dotenv/config'

import express from 'express'
import { resolve } from 'path'
import postRouter from 'routers/PostRouter'
import '@/db/Connect'

const app = express()

app.use('/post', postRouter)

app.listen(3333, () => {
  console.log('server is stated at port 3333')
})
