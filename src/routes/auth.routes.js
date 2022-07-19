import { Router } from 'express'
import * as userCtrls from '../controllers/user.controllers'
import IsValidEmail from '../middlewares/IsValidEmail'
import isValidRole from '../middlewares/isValidRole'
import { verifyToken } from '../middlewares/isAuthenticated'
import { authToken } from '../controllers/auth.controller'

const router = Router()
router.post('/signup', [IsValidEmail, isValidRole], userCtrls.signUp)
router.post('/signin', userCtrls.signIn)
router.post('/logout', [verifyToken], userCtrls.logout)
router.post('/', [verifyToken], authToken)


export default router