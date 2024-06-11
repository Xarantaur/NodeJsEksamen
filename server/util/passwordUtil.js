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


