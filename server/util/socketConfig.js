import { Server } from "socket.io";
import { sessionMiddleware } from "../app.js";

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["*"],
    },
  });

  io.engine.use(sessionMiddleware);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });
  });

  return io;
};

export default configureSocket;
