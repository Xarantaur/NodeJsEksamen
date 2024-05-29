import db from "./connection.js";
import { ObjectId } from "mongodb";

export const updateUser = async (email, updateData) => {
  const user = await db.users.updateOne({ email: email }, { $set: updateData });
  return user;
};

export const updateCard = async (updateData) => {
  const {_id, ...updateFields} = updateData;
  const result = await db.mtg.updateOne( {_id: new ObjectId(_id) }, { $set: updateFields });
  return result;
};
