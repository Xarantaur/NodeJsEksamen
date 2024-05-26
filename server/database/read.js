import db from "./connection.js"

export const findUser = async (email) => {
    const user = await db.users.findOne({ email: email });
    console.log(user)
    return user
};

export const findCard = async (name) => {
    const card = await db.mtg.findOne({ name: name  });
    console.log(card)
    return card
};

export const findAllCards = async () => {
    const cards = await db.mtg.find();
    return cards
}


