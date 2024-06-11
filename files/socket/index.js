import { io } from "../../index.js";
let socketData;
io.on("connection", function (socket) {
    console.log("user connected " + socket.id);
    socketData=socket

    

    // socket connection close event
    socket.on("", () => {
       
    });
});



export default socketData;