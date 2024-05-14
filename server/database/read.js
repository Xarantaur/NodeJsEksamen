import db from "./connection.js"

/* Ændre dette til en af de tables der oprettes til projektet i connection.js :: --------------------------------- */

const findUser = async (email) => {
    const user = await db.users.findOne({ email: email });
    console.log(user)
    return user
};

export default findUser

/* console.log(allUnits) */