import bcrypt from "bcrypt";
import { generatePassword } from "secure-password-utilities"


const saltRounds = 14;

export const hashPassword = async (plainTextPassword) => 
    bcrypt.hash(plainTextPassword, saltRounds);

export const comparePassword = async (plainTextPassword, password) =>
  bcrypt.compare(plainTextPassword, password);

export function newPassword(){
  const password = generatePassword(8)
  return password
}

/* export async function generatePassword() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";


  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
 */

