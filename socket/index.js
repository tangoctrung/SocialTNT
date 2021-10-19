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
    console.log("1 user connection");
    // nhận userId và socketId từ người dùng
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        socket.emit("getUser", users);
    })

    // khi nhắn tin và nhận tin
    socket.on("sendMessage", ({m, receivedId}) => {
        const user = getUser(receivedId);
        socket.to(user?.socketId).emit("getMessage", m);
    });

    // xóa tin nhắn
    socket.on("deleteMessage", ({messageId, receivedId}) => {
        const user = getUser(receivedId);
        socket.to(user?.socketId).emit("deleteMessageToClient", {messageId});
    })

    // gửi ám hiệu typing khi chat 2 người
    socket.on("typing", ({senderId, receivedId, typing}) => {
        const user = getUser(receivedId);
        socket.to(user?.socketId).emit("typingToClient", {senderId, typing});
    })

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

    // khi người dùng edit comment
    socket.on("editComment", (comment) => {
        users.forEach( user => {
            socket.to(user.socketId).emit("editCommentToClient", comment);
        })
    });


    // khi người dùng xóa comment
    socket.on("deleteComment", (comment) => {
        users.forEach( user => {
            socket.to(user.socketId).emit("deleteCommentToClient", comment);
        })
    });

    // khi người dùng edit post
    socket.on("editPost", (post) => {
        users.forEach( user => {
            socket.to(user.socketId).emit("editPostToClient", post);
        })
    });

    // khi người dùng tạo bài viết thì gửi đến thông báo
    socket.on("createPost", (noti) => {
        users.forEach( user => {
           if (noti.receiverNotiId?.includes(user.userId))  {
                socket.to(user.socketId).emit("createPostToClient", noti);
            }
        })
    });

    // khi người dùng likePost. dislikePost thì gửi đến thông báo
    socket.on("likePostNoti", (noti) => {
        users.forEach( user => {
           if (noti.receiverNotiId?.includes(user.userId))  {
                socket.to(user.socketId).emit("likePostNotiToClient", noti);
            }
        })
    });

    // khi người dùng likeComment thì gửi đến thông báo
    socket.on("likeCommentNoti", (noti) => {
        users.forEach( user => {
           if (noti.receiverNotiId?.includes(user.userId))  {
                socket.to(user.socketId).emit("likeCommentNotiToClient", noti);
            }
        })
    });

    // khi người dùng commentPost thì gửi đến thông báo
    socket.on("commentPostNoti", (noti) => {
        users.forEach( user => {
           if (noti.receiverNotiId?.includes(user.userId))  {
                socket.to(user.socketId).emit("commentPostNotiToClient", noti);
            }
        })
    });
    // khi người dùng replyCommentPost thì gửi đến thông báo
    socket.on("replyCommentPostNoti", (noti) => {
        users.forEach( user => {
           if (noti.receiverNotiId?.includes(user.userId))  {
                socket.to(user.socketId).emit("replyCommentPostNotiToClient", noti);
            }
        })
    });


    // khi người dùng ngắt kết nối
    socket.on("disconnect", () =>{
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
})