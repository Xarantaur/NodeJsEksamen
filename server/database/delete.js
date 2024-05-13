import db from "./connection.js"

const deleteMany = await db.users.deleteMany({ /* indsæt kritere der søges efter. e.g. "name: "twister"" */});

console.log(deleteMany)