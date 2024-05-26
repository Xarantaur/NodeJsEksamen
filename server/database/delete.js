import db from "./connection.js";

 export const deleteUser = async (email) => {
  const user = await db.users.deleteOne({ email: email });
  return user
};

 export const deleteCard = async (name) => {
  const card = await db.mtg.deleteOne({ name: name });
  return card
};

