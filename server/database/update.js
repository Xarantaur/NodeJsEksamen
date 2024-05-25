import db from "./connection.js";

const updateUser = async (email, updateData) => {
  const user = await db.users.updateOne({ email: email }, { $set: updateData });
   console.log(user)
  return user;
};

export default updateUser;
