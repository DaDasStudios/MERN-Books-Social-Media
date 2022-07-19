import express from 'express'
import morgan from 'morgan'
import booksRoutes from './routes/books.routes'
import authRoutes from './routes/auth.routes'
import usersRoutes from './routes/users.routes'
import genRoles from './libs/genRoles'
import notFoundHandler from './controllers/404.controller'
import path from 'path'

import { PORT } from './config'

const app = express()
genRoles()
app.set('port', PORT || 5000)


// * Middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(morgan('dev'))

// * Routes
app.use('/api/books', booksRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)

//* Public
app.use(express.static(path.join(__dirname, 'public')))

// * 404 Not found handler
app.use(notFoundHandler)


export default app