import { Router } from 'express'
import { get, create, getSingle } from '#src/controllers/moviesController'

const router = Router()

router.route('/').get(get)
router.route('/').post(create)
router.route('/:id').get(getSingle)

export default router
