import "dotenv/config";
import express from "express";
import path from 'path';
import session from "express-session";
import http from "http";
import { Server } from "socket.io";

// Initialiser app med express
const app = express();
app.use(express.static(path.resolve("../client/dist")));
app.use(express.json());

// Opret session middleware
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
});

app.use(sessionMiddleware);

// Opret en HTTP server
const server = http.createServer(app);

// Initialiser socket.io med den oprettede server
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["*"]
  }
});

// Gør så socket.io benytter sig af session middleware
io.engine.use(sessionMiddleware);

// Håndter socket.io connection 
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// Importer og gør så app benytter sig af de routere
import sessionRouter from "./routes/sessionRouter.js";
app.use(sessionRouter);

import authenticationRouter from "./routes/authRouter.js";
app.use(authenticationRouter);

import userRouter from "./routes/userRouter.js";
app.use(userRouter);

// Root route
app.get("/", (req, res) => {
  res.send({ data: "velkommen" });
});

// Start serveren
const PORT = process.env.PORT ?? 8080;
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
