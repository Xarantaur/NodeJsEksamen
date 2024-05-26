import db from "./connection.js"
import findUser from "./read.js"

export const createUser = async (email, password, ) => {
    const newUser = await db.users.insertOne({ email: email, password: password})
    const user = await findUser(email)
    return user
}

export const createCard = async (name, manacost, type, rarity, set, ability, power, toughness) => {
    const newCard = await db.mtg.insertOne({ name: name, manacost: manacost, type: type, rarity: rarity, 
                                             set: set, ability: ability, power: power, toughness: toughness});
    return newCard;
}


