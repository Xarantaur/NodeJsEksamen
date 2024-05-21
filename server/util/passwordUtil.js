import bcrypt from "bcrypt";

const saltRounds = 14;

export const hashPassword = async (plainTextPassword) => bcrypt.hash(plainTextPassword, saltRounds)

export const comparePassword = async ( plainTextPassword, user) => bcrypt.compare(plainTextPassword, user.password)
