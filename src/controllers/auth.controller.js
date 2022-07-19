import jwt from 'jsonwebtoken'
import { INVALID_TOKEN, NO_TOKEN_PROVIDED, USER_NOT_FOUND } from '../util/jsonStatus'
import { JWT_SECRET } from '../config'
import User from '../models/User'
import { ONE_DAY } from '../util/jwt'

export async function authToken(req, res) {
    try {
        const token = req.headers["x-access-token"]
        if (!token) return res.status(403).json(NO_TOKEN_PROVIDED)
        const decoded = jwt.verify(token, JWT_SECRET)
        const foundUser = await User.findById(decoded.id)
        if (!foundUser) return res.status(404).json(USER_NOT_FOUND)
        const newToken = jwt.sign({ id: foundUser._id }, JWT_SECRET, { expiresIn: ONE_DAY })
        return res.status(200).json({ token: newToken })
    } catch (error) {
        return res.status(401).json(INVALID_TOKEN)
    }
}