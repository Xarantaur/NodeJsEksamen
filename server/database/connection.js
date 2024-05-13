import { MongoClient } from "mongodb"

const URL ="mongodb://localhost:27017"
const client = new MongoClient(URL);


// --------------------------------ændre dbname til noget relevant for projektet ------------< 
const dbName = "examdb"; 

await client.connect();
const db = client.db(dbName);

export default {
    users: db.collection("users")
 /* TODO :  figure out tables that are relevant for tables. ----------------------------------------< */
    }