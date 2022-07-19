import Role from '../models/Role'
import ROLES from '../util/roles'

export default async () => {
    try {
        const numberRoles = await Role.estimatedDocumentCount()
        if (numberRoles > 0) return

        const values = await Promise.all([
            new Role({ name: ROLES[0] }).save(),
            new Role({ name: ROLES[1] }).save(),
            new Role({ name: ROLES[2] }).save()
        ])
        console.log(values)
    } catch (error) {
        console.error(error)
    }
}