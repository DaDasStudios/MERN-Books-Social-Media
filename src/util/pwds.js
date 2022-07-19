import bcrypt from 'bcryptjs'

const SALTS = 10

export async function encryptPwd(pwd) {
    const salt = await bcrypt.genSalt(SALTS)
    return await bcrypt.hash(pwd, salt)
}

export async function comparePwd(pwd, encryptedPwd) {
    return await bcrypt.compare(pwd, encryptedPwd)
}