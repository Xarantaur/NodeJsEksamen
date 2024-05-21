import db from "./connection.js"


/* const createUser = await db.users.insertOne({ email: email, password: password})
console.log(createUser) */
const createUser = async (email, password, ) => {
    const user = await db.users.insertOne({ email: email, password: password, isAdmin: null})
    return user
}

export default createUser