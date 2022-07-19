import { NOT_AUTHENTICATED } from '../util/jsonStatus'
import ROLES, { REQUIRE_ADMIN_ROLE, REQUIRE_MODERATOR_ROLE } from '../util/roles'
import findRoles from '../util/findRoles'

export async function isModerator(req, res, next) {
    if (!req.user) return res.status(403).json(NOT_AUTHENTICATED)

    // Figure out which roles the user has
    if (await findRoles(req.user.roles, ROLES[2])){
        next()
    }
    else {
        return res.status(401).json(REQUIRE_MODERATOR_ROLE)
    }
}

export async function isAdmin(req, res, next) {
    if (!req.user) return res.status(403).json(NOT_AUTHENTICATED)

    if (await findRoles(req.user.roles, ROLES[1])){
        next()
    }
    else {
        return res.status(401).json(REQUIRE_ADMIN_ROLE)
    }
}