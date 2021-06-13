let io;
exports.socketConnection = (server) => {
    io = require('socket.io')(server, {
        cors: {
            origin: "http://3.15.93.104:8080",
            methods: ["GET", "POST"],
            credentials: true
        }, 
    });

    // io.on('connection',(socket)=>{
    //     console.log('connected');
    //     console.log(socket.id);
    //     socket.on("disconnect", () => {
    //         console.log("Client disconnected");
    //       });
    // });
};

exports.sendMessage = (id, key, message) => io.to(id).emit(key, message);