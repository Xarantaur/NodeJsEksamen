import db from "./connection.js"


const insert = await db.oneOfTheTablesInConnectionExport.insertOne({ /*  hvad der skal indsættes. det skal hentes et sted fra frontend ---> */})