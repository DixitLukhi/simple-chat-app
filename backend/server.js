const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("Socket is connected ");

    socket.on("chat", (payload) => {
        console.log("payload is : ", payload);
        io.emit("chat", payload);
    })
})

server.listen(5000, () => {
    console.log("sever is listening...");
})