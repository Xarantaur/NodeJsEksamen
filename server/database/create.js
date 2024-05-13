import db from "./connection.js"


const insert = await db.users.insertOne({ /*  hvad der skal indsættes. det skal hentes et sted fra frontend ---> */})
console.log(insert)