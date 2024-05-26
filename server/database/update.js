import db from "./connection.js";

export const updateUser = async (email, updateData) => {
  const user = await db.users.updateOne({ email: email }, { $set: updateData });
   console.log(user)
  return user;
};

export const updateCard = async (name, updateData) => {
  const card = await db.mtg.updateOne({ name: name }, { $set: updateData });
   console.log(card)
  return card;
};

