const io = require('socket.io')(8900, {
    cors: {
        origin: 'http://localhost:3000',
    },
});
let users = [];

// const addUser = (userId, socketId) => {
//     !users.some((user) => user.userId === userId) &&
//       users.push({ userId, socketId });
//   };
  
//   const removeUser = (socketId) => {
//     users = users.filter((user) => user.socketId !== socketId);
//   };
  
//   const getUser = (userId) => {
//     return users.find((user) => user.userId === userId);
//   };
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({userId, socketId});
}
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}
const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
}

io.on('connection', (socket) =>{
    // khi người dùng kết nối vào scoket server
    console.log("a user connected");

    // nhận userId và socketId từ người dùng
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUser", users);
    })

    // khi nhắn tin và nhận tin
    socket.on("sendMessage", ({senderId, receivedId, content}) => {
        const user = getUser(receivedId);
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            content,   
        });
    });

    // khi người dùng ngắt kết nối
    socket.on("disconnect", () =>{
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
})