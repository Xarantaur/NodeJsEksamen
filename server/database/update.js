import db from "./connection.js" 

const updateUser = async (email, username, age) => {
    const user = await db.users.updateOne({ email: email}, { $set: { username: username, age: age}})
    console.log(user)
    return user
}

export default updateUser