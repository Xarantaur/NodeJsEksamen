import bcrypt from "bcrypt";

const saltRounds = 14;

export const hashPassword = async (plainTextPassword) => bcrypt.hash(plainTextPassword, saltRounds)

export const comparePassword = async ( plainTextPassword, password) => bcrypt.compare(plainTextPassword, password)


/* ----------------------- er det her overhovedet ok? */
export async function generatePassword(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = "";
    const charLength = characters.length
    
    for(let i=0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * charLength)
        result += characters.charAt(randomIndex)
    }
    return result
}
