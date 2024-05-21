import db from "./connection.js";

 const deleteUser = async (email) => {
  const user = await db.users.deleteOne({ email: email });
  return user
};

export default deleteUser