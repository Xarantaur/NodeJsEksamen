import { findUser } from "../database/read.js";
import { comparePassword } from "./passwordUtil.js";

async function login(email, plainTextPassword) {
  const user = await findUser(email);
  if (!user) {
    return null;
  } else {
    const { password } = user;
    const result = await comparePassword(plainTextPassword, password);
    if (result === false) {
      ("Wrong Email or Password");
      return null;
    }
    if (result === true) {
      return user;
    }
  }
}

export default login;
