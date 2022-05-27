import { createContributor } from 'services/ContributorService'
import { Router } from 'express'

const ContributorRouter = Router()

// 默认展示前五位
ContributorRouter.get('/:postObjectId')

// 显示文章的所有贡献者
ContributorRouter.get('/all/:postObjectId')

// 添加贡献者
ContributorRouter.put('/', createContributor)

export default ContributorRouter
