import { config } from 'dotenv'
config()

export const PORT = process.env.PORT
export const MONGODB_URI = process.env.MONGODB_URI
export const MONGODB_USER = process.env.MONGODB_USER
export const MONGODB_PWD = process.env.MONGODB_PWD
export const JWT_SECRET = process.env.JWT_SECRET