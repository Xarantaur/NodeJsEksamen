import db from "./connection.js" 

const update = await db.oneOfTheTablesInConnectionExport.updateOne({ /* søge kritere for hvad der skal opdateres e.g. {name: "twister" }, og så de værdier der skal ændres : { $set: { price: 12}} */})

console.log(update)