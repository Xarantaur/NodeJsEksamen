import db from "./connection.js"

const findUser = async (email) => {
    const user = await db.users.findOne({ email: email });
    console.log(user)
    return user
};

export default findUser
