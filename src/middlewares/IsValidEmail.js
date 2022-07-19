import User from '../models/User'
import { INVALID_DATA, INVALID_EMAIL } from '../util/jsonStatus'

export default async function (req, res, next) {
    const { email } = req.body
    if (!email) return res.status(400).json(INVALID_DATA)
    const foundUser = await User.findOne({ email })
    // If there's a user with the provided email, then return a status of 400
    if (foundUser) return res.status(400).json(INVALID_EMAIL)

    next()
}