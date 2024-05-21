import bcrypt from "bcrypt";

const saltRounds = 14;

export async function hashPassword(plainTextPassword) {
  const hashPassword = await bcrypt.hash(plainTextPassword, saltRounds);
  return hashPassword;
}

export const comparePassword = async ( plainTextPassword, user) => bcrypt.compare(plainTextPassword, user.password)
