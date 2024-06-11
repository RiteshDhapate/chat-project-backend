import {config} from "dotenv";
config();
import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import DBConnection from "./files/utils/db.js";
import userRoute from "./files/routes/user.route.js";
import jwt from "jsonwebtoken";
import { insertUserMessage } from "./files/functions/insertUserMessage.js";
import { insertGroupMessage } from "./files/functions/insertGroupMessage.js";
// import socketData from "./files/socket/index.js";


const PORT = process.env.PORT || 2001;
const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});



  DBConnection();
  app.use(express.json());
  app.use(cors());
  app.use("/api/v1",userRoute);


  app.get("/", function (req, res) {
    res.send("Hello");
  });
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT} `);
  });






io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("sendMessage", async(data) => {
    const { token, to, chatType, message, messageType } = data;
     const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    const from = decodedData._id;  
    if (chatType === "friend") {
      await insertUserMessage(from, to, message, messageType);
    } else if (chatType === "group") {
      await insertGroupMessage(to, from, message, messageType);
    }

    io.emit("newMessage", { to,from });
  });
 });