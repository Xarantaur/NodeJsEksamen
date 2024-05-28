import db from "./connection.js";
import { findUser } from "./read.js";

export const createUser = async (email, password) => {
  await db.users.insertOne({ email: email, password: password });
  const user = await findUser(email);
  return user;
};

/* lad os håbe at der her virker, har ændret at alle parameter gives med til at den bare modtager et object fra route */
export const createCard = async ( card ) => {
  try {
  const result = await db.mtg.insertOne( card );
  return result;
  } catch (error){
    console.error( error.message )
    throw error 
  }
};
