import db from "./connection.js"


const createUser = await db.users.insertOne({ email: email, password})
/* console.log(createUser) */

export default createUser