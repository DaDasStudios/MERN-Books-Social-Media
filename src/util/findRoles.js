import Role from '../models/Role'

export default async function(userRoles, neededRole) {

    // Figure out which roles the user has
    const foundRoles = await Role.find({ _id: { $in: userRoles } }, { _id: 0 })

    for (const role of foundRoles) {
        if (role.name === neededRole){
            return true
        }
    } 
    return false
}