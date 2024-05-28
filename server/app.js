import "dotenv/config";
import express from "express";
import path from 'path';
import session from "express-session";
import http from "http";
import configureSocket from "./util/socketConfig.js";


// Initialiser app med express
const app = express();
app.use(express.static(path.resolve("../client/dist")));
app.use(express.json());

// Opret session middleware
export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
});

app.use(sessionMiddleware);
// Create an HTTP server
const server = http.createServer(app);

// Configure socket.io with the created server
configureSocket(server);

// Importer og gør så app benytter sig af de routere LiveChat
import sessionRouter from "./routes/sessionRouter.js";
app.use(sessionRouter);

import authenticationRouter from "./routes/authRouter.js";
app.use(authenticationRouter);

import userRouter from "./routes/userRouter.js";
app.use(userRouter);

import mtgRouter from "./routes/mtgRouter.js";
app.use(mtgRouter)

// Root route
app.get("/", (req, res) => {
  res.send({ data: "velkommen" });
});


// Start serveren LiveChat
const PORT = process.env.PORT ?? 8080;
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
