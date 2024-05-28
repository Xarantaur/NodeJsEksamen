import db from "./connection.js";

/*  fjernet "return user", hvorfor skulle man returnere noget der lige er slettet, det vil vise sig om det giver mening når vi engang implementere delete*/
 export const deleteUser = async (email) => {
  await db.users.deleteOne({ email: email });
};

 export const deleteCard = async (name) => {
  const card = await db.mtg.deleteOne({ name: name });
  return card
};

