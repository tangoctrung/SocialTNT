import axios from "axios";
import { Context } from "context/Context";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import "./Notification.css";
import NotificationType from "components/NotificationType/NotificationType";

function Notification() {

    const { user, socket } = useContext(Context); 
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        socket?.on("createPostToClient", (noti) => {
            const listNoti = [...notifications];
            listNoti.unshift(noti);
            setNotifications(listNoti);
            console.log(noti);
        })
    }, [notifications])

    // LẤY TẤT CẢ THÔNG BÁO CỦA NGƯỜI DÙNG
    useEffect(() => {
        setIsLoading(true);
        const fetchNoti = async () => {
            const res = await axios.get(`/notifications/getNotification/${user?._id}`);
            console.log(res.data);
            setNotifications(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
              }));
            setIsLoading(false);
        }
        fetchNoti();
    }, [user?._id])

    // KHI CLICK VÀO THÔNG BÁO
    const handleClickNotification = async (noti) => {
        const dataNoti = {
            userId: user?._id,
            notiId: noti?._id
        }
        await axios.put(`/notifications/updateNotification`, dataNoti);
    }

    return (
        <div className="notification">
            <div className="notification-container">
                <h2>Thông báo của bạn</h2>

                {notifications && !isLoading && notifications.map((noti, index) => (
                    <div onClick={()=> handleClickNotification(noti)}>
                        <NotificationType key={index} noti={noti} />
                    </div>
                ))}
                {notifications.length === 0 && !isLoading && <p>Bạn chưa có thông báo nào</p>}
                {isLoading && <div className="notification-container-loading"> <div className="spinner-2"></div><p>Đang tải...</p> </div>}  
            </div>
        </div>
    )
}

export default Notification;
