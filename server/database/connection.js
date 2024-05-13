import { MongoClient } from "mongodb"

const URL =  ""
const client = new MongoClient(URL);


// --------------------------------ændre dbname til noget relevant for projektet ------------< 
const dbName = "dbname"; 

await client.connect();
const db = client.db(dbName);

export default {
    
 /* TODO :  figure out tables that are relevant for tables. ----------------------------------------< */
    }