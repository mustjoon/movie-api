import { Router } from 'express'
import { get } from '#src/controllers/actorController'

const router = Router()
router.route('/').get(get)
// router.route("/").post(create);

export default router
