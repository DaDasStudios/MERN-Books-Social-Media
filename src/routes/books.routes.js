import { Router } from 'express'
import * as booksCtrl from '../controllers/books.controller'
import { verifyToken } from '../middlewares/isAuthenticated'
import { isModerator, isAdmin } from '../middlewares/isAuthorized'

const router = Router()
router.route('/')
    .get([verifyToken], booksCtrl.getAllBooks)
    .post([verifyToken], booksCtrl.createBook)
    .delete([verifyToken, isAdmin], booksCtrl.deleteAllBooks)

router.route('/user/:id')
    .get([verifyToken], booksCtrl.getBooksByUserId)

router.route('/:id')
    .get([verifyToken], booksCtrl.getSingleBookById)
    .put([verifyToken], booksCtrl.updateBookById)
    .delete([verifyToken], booksCtrl.deleteBookById)


export default router