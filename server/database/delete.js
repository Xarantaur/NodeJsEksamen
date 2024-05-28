import db from "./connection.js";

export const deleteUser = async (email) => {
  const result = await db.users.deleteOne({ email: email });
  return result;
};

export const deleteCard = async (name) => {
  const result = await db.mtg.deleteOne({ name: name });
  return result;
};
