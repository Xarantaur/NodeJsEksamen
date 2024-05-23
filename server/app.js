import "dotenv/config";

import express from "express";
const app = express();

app.use(express.json());

import path from "path";
app.use(express.static(path.resolve("../client/dist")));

import session from "express-session";
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

import sessionRouter from "./routes/sessionRouter.js";
app.use(sessionRouter);

import authenticationRouter from "./routes/authRouter.js";
app.use(authenticationRouter);

import userRouter from "./routes/userRouter.js";
app.use(userRouter);

app.get("/", (req, res) => {
  res.send({ data: "velkommen" });
});

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("server is running on port:", PORT));
