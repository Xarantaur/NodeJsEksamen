import db from "./connection.js"
import findUser from "./read.js"

const createUser = async (email, password, ) => {
    const newUser = await db.users.insertOne({ email: email, password: password})
    const user = await findUser(email)
    return user
}

export default createUser