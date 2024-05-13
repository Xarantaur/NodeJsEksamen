import db from "./connection.js"

/* Ændre dette til en af de tables der oprettes til projektet i connection.js :: --------------------------------- */
const allUnits = await db.users.find({}).toArray();

console.log(allUnits)