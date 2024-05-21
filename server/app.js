import "dotenv/config";

import express from "express";
const app = express();

app.use(express.json());

import session from "express-session";
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

import authenticationRouter from "./routes/authRouter.js";
app.use(authenticationRouter);

import userRouter from "./routes/userRouter.js"
app.use(userRouter)

app.get("/", (req, res) => {
  res.send({ data: "velkommen" });
});

/* import path from "path";
app.use(express.static(path.resolve('../client/dist'))) */

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("server is running on port:", PORT));
