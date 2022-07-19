import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import User from '../models/User'
import { INVALID_TOKEN, NO_TOKEN_PROVIDED, USER_NOT_FOUND } from '../util/jsonStatus'

export async function verifyToken(req, res, next) {
    try {
        const token = req.headers["x-access-token"]
        if (!token) return res.status(403).json(NO_TOKEN_PROVIDED)

        // Intent to find that user
        const decoded = jwt.verify(token, JWT_SECRET)
        const foundUser = await User.findById(decoded.id)
        if (!foundUser) return res.status(404).json(USER_NOT_FOUND)

        // Save the authenticated user into the "request" variable
        req.user = foundUser
        next()
    } catch (error) {
        return res.status(401).json(INVALID_TOKEN)
    }
}