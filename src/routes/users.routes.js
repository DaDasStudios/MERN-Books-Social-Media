import { Router } from 'express'
const router = Router()
import { getUser, updateUser } from '../controllers/user.controllers'
import { verifyToken } from '../middlewares/isAuthenticated'

router.get('/user', [verifyToken], getUser)
router.put('/user', [verifyToken], updateUser)

export default router