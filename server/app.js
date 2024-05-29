import "dotenv/config";
import express from "express";
import path from "path";
import session from "express-session";
import http from "http";
import configureSocket from "./util/socketConfig.js";

const app = express();
app.use(express.static(path.resolve("../client/dist")));
app.use(express.json());

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

app.use(sessionMiddleware);

const server = http.createServer(app);

configureSocket(server);

import sessionRouter from "./routes/sessionRouter.js";
app.use(sessionRouter);

import authenticationRouter from "./routes/authRouter.js";
app.use(authenticationRouter);

import userRouter from "./routes/userRouter.js";
app.use(userRouter);

import mtgRouter from "./routes/mtgRouter.js";
app.use(mtgRouter);

app.get("/", (req, res) => {
  res.send({ data: "velkommen" });
});

const PORT = process.env.PORT ?? 8080;
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
