const io = require('socket.io')(8900, {
    cors: {
        origin: 'http://localhost:3000',
    },
});
let users = [];

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

    // khi người dùng likePost
    socket.on("likePost", ({likes, dislikes, postId}) => {
        users.forEach(user => {           
            socket.to(user.socketId).emit("likePostToClient", {likes, dislikes, postId});          
        })
    });
    // khi người dùng cancle LikePost
    socket.on("cancleLikePost", ({postId}) => {
        users.forEach(user => {
            socket.to(user.socketId).emit("cancleLikePostToClient", {postId});
        })
    });

     // khi người dùng dislikePost
    socket.on("disLikePost", ({likes, dislikes, postId}) => {
        users.forEach(user => {
            socket.to(user.socketId).emit("disLikePostToClient", {likes, dislikes, postId});
        })
    });
    // khi người dùng cancle DislikePost
    socket.on("cancleDislikePost", ({postId}) => {
        users.forEach(user => {
            socket.to(user.socketId).emit("cancleDislikePostToClient", {postId});
        })
    });

    // khi người dùng likeComment
    socket.on("likeComment", ({commentId, likesComment}) => {
        users.forEach(user => {
            socket.to(user.socketId).emit("LikeCommentToClient", {commentId, likesComment});
        })
    });
    // khi người dùng cancle likeComment
    socket.on("cancleLikeComment", ({commentId, likesComment}) => {
        users.forEach(user => {
            socket.to(user.socketId).emit("cancleLikeCommentToClient", {commentId, likesComment});
        })
    });

    // khi người dùng viết comment
    socket.on("createComment", (newComment) => {
        users.forEach(user => {
                socket.to(user.socketId).emit("createCommentToClient", newComment);
        })
    });


    // khi người dùng ngắt kết nối
    socket.on("disconnect", () =>{
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
})