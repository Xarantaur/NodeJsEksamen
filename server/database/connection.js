import { MongoClient } from "mongodb"

const URL ="mongodb://localhost:27017"
const client = new MongoClient(URL);

const dbName = "examdb"; 

await client.connect();
const db = client.db(dbName);

export default {
    users: db.collection("users"),
    mtg: db.collection("mtg")

    }