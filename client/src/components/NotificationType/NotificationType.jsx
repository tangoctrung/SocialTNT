import axios from "axios";
import { Context } from "context/Context";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";


function NotificationType({noti}) {

    const { user } = useContext(Context);
    const [isRead, setIsRead] = useState(noti?.readNotiId.includes(user?._id));
    const handleDeleteNotification = async () => {
        const dataNoti = {
            userId: user?._id,
            notiId: noti?._id
        }
        await axios.put(`/notifications/deleteNotification`, dataNoti);
        window.location.reload();
    }
    
    return (  
        <>
            {!noti?.deleteNotiId.includes(user?._id) && <div className={!isRead ? 'notification-item isRead' : "notification-item"}>
                <Link 
                 to={`/post/${noti?.postNotiId}`} 
                 className="notification-item-img" 
                 style={{textDecoration: "none", color: "black"}}
                >
                    <img src={noti?.senderNotiId.avatar} alt="image" />
                </Link>

                <Link 
                 to={`/post/${noti?.postNotiId}`} 
                 style={{textDecoration: "none", color: "black"}}  
                 className="notification-item-info"
                >
                    <div className="notification-item-content">
                        {noti?.typeNoti ==="likePost" && <p>
                            <b>{noti?.senderNotiId.username}</b> đã thích bài viết của bạn - "Yêu là chết ở trong lòng một ít..."
                        </p>}
                        {noti?.typeNoti ==="createPost" && <p>
                            <b>{noti?.senderNotiId.username}</b> đăng tải một bài viết - "Web server là gì?..."
                        </p>}
                        {noti?.typeNoti ==="commentPost" && <p>
                            <b>{noti?.senderNotiId.username}</b> đã bình luận bài viết của bạn - "Nghe hay đấy nhỉ?"
                        </p>}
                        {noti?.typeNoti ==="likeComment" && <p>
                            <b>{noti?.senderNotiId.username}</b> đã thích bình luận của bạn - "Xinh thế nhỉ."
                        </p>}
                        {noti?.typeNoti ==="replyComment" && <p>
                            <b>{noti?.senderNotiId.username}</b> đã trả lời bình luận của bạn - "Haha, xem hài vch."
                        </p>}
                    </div>
                    <div className="notification-item-time">
                        <p>{format(noti?.createdAt)}</p>
                    </div>
                </Link>
                
                <div className="notification-item-menu">
                    <i className="fas fa-ellipsis-h"></i>
                    <div className="notification-item-listMenu">
                        <div className="notification-item-itemMenu" onClick={handleDeleteNotification}>
                            <i className="fas fa-trash"></i>
                            <span>Xóa thông báo</span>
                        </div>
                    </div>
                </div>
            </div>}  
        </>
    )
}

export default NotificationType;
