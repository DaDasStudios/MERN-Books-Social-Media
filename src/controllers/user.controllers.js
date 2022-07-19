import User from '../models/User'
import Role from '../models/Role'
import jwt from 'jsonwebtoken'
import { comparePwd, encryptPwd } from '../util/pwds'
import { INVALID_DATA, INVALID_PASSWORD, NO_TOKEN_PROVIDED, USER_NOT_FOUND, INTERNAL_ERROR } from '../util/jsonStatus'
import { JWT_SECRET } from '../config'
import { ONE_DAY } from '../util/jwt'

export async function signUp(req, res) {
    const { username, email, password, roles } = req.body

    // In case some infomartion is invalid like empty strings or undefineds
    if ([username, email, password].some(each => !each)) return res.status(400).json(INVALID_DATA)

    // Create user
    const newUser = new User({
        username,
        email
    })

    // Hash password
    newUser.password = await encryptPwd(password)

    // Assign the roles
    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const userRole = await Role.findOne({ name: 'User' })
        newUser.roles = [userRole._id]
    }

    const savedUser = await newUser.save()
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
        expiresIn: ONE_DAY
    })
    return res.status(201).json({ token })
}

export async function signIn(req, res) {
    const { email, password } = req.body
    if ([email, password].some(each => !each)) return res.status(400).json(INVALID_DATA)

    // Look for that user
    const foundUser = await User.findOne({ email })
    if (!foundUser) return res.status(404).json(USER_NOT_FOUND)

    // Compare the password
    const matchPwd = await comparePwd(password, foundUser.password)
    if (!matchPwd) return res.status(406).json(INVALID_PASSWORD)

    // Decode token
    const token = jwt.sign({ id: foundUser._id }, JWT_SECRET, {
        expiresIn: ONE_DAY
    })
    return res.status(200).json({ token })
}

export async function logout(req, res) {
    // To not return a token
    const authHeader = req.headers["x-access-token"]
    if (authHeader) {
        const logout = jwt.sign({ id: authHeader }, JWT_SECRET, { expiresIn: 1 })
        if (logout) return res.status(200).json({ message: "Logout successfully", token: logout })
    }
    return res.status(400).json(NO_TOKEN_PROVIDED)
}

export async function getUser(req, res) {
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, JWT_SECRET)
    const foundUser = await User.findById(decoded.id, { roles: 0, password: 0 })
    if (!foundUser) return res.status(404).json(USER_NOT_FOUND)
    return res.status(200).json(foundUser)
}

export async function updateUser(req, res) {
    try {
        const { id, username, email, password } = req.body
        if ([id, username, email, password].some(each => !each)) return res.status(400).json(INVALID_DATA)

        // Find user
        const foundUser = await User.findById(id)
        if (!foundUser) return res.status(404).json(USER_NOT_FOUND)

        // Verify match password
        if (! await comparePwd(password, foundUser.password)) return res.status(406).json(INVALID_PASSWORD)

        // Update information
        const updatedUser = await User.findByIdAndUpdate(foundUser._id, { username, email }, { new: true })
        return res.status(201).json(updatedUser)
    } catch (error) {
        return res.status(500).json(INTERNAL_ERROR)
    }

}