import ROLES from '../util/roles'
import { INVALID_ROLE } from '../util/jsonStatus'

export default async function (req, res, next) {
    const { roles } = req.body
    const logs = []
    if (roles) {
        roles.forEach(role => {
            if (!ROLES.includes(role)) logs.push(`Role <${role}> Does Not Exist`)
        })
        if (logs.length > 0) return res.status(400).json({
            ...INVALID_ROLE,
            invalidRoles: logs
        })
    }
    next()
}