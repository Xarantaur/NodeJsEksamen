import express from "express";
const app = express();

app.use(express.json());

import authenticationRouter from "./routes/authRouter.js"
app.use(authenticationRouter)

app.get("/", (req, res) => {
    res.send({data:"velkommen"})
})

/* import path from "path";
app.use(express.static(path.resolve('../client/dist'))) */

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("server is running on port:", PORT));
