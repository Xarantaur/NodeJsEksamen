import { Server } from "socket.io";
import { sessionMiddleware } from "../app.js"; // Adjust the path to your session middleware file

// Function to configure socket.io
const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["*"],
    },
  });

  // Use session middleware for socket.io
  io.engine.use(sessionMiddleware);

  // Handle socket.io connections
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
