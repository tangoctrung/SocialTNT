import Leftbar from 'components/Leftbar/Leftbar';
import React from 'react';
import "./AllUser.css";
import { useState } from 'react';
import UserSmall from 'components/UserSmall/UserSmall';
import { useEffect } from 'react';
import axios from 'axios';
import { Context } from 'context/Context';
import { useContext } from 'react';
import NotificationFast from 'components/NotificationFast/NotificationFast';

function AllUser() {

    const [listUser, setListUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user, socket } = useContext(Context);
    const [isNotiCreatePost, setIsNotiCreatePost] = useState(false);
    const [listNoti, setListNoti] = useState([]);

    // thông báo createPost, likePost, commentPost
    useEffect(() => {
        socket?.on("createPostToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
        });
        socket?.on("likePostNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
        });
        socket?.on("commentPostNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
        })
        socket?.on("replyCommentPostNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
        })
        socket?.on("likeCommentNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
        })
    }, [])
    setTimeout(() => {
        if(isNotiCreatePost) {
            setIsNotiCreatePost(false);
        }
    }, 5000)
    const handleClickNotiFast = async (noti, index) => {
        const dataNoti = {
            userId: user?._id,
            notiId: noti?._id
        }
        await axios.put(`/notifications/updateNotification`, dataNoti);
    }

    useEffect(() => {
        setIsLoading(true);
        const FetchAllUser = async () => {
            const res = await axios.get("/users/alluser");
            setListUser(res.data);
            setIsLoading(false);
        }
        FetchAllUser();
    }, [])
    return (
        <>
            <div className="all-user">
                <div className="all-user-left">
                    <Leftbar />
                </div>
                <div className="all-user-container">
                    <div className="all-user-container-input">
                        <input type="text" placeholder="Nhập tên hoặc email của người dùng" />
                        <button type="submit">Tìm kiếm</button>
                    </div>
                    <div className="all-user-container-listUser">
                        {listUser && !isLoading && listUser.map((user, index)=> <UserSmall key={index} data={user} />)} 
                        {isLoading && <div className="all-user-container-listUser-loading">
                            <div className="spinner-1"></div>
                            <p>Đang tải người dùng...</p>
                        </div>}                  
                    </div>
                </div>
            </div>

            {isNotiCreatePost && 
                        <div className="homePage-noti">
                            {listNoti && listNoti.map( (noti, index) => (
                                <div key={index} onClick={() => handleClickNotiFast(noti, index)}>
                                    <NotificationFast noti={noti} />
                                </div>
                            ))}
                        </div>}
        </>
    )
}

export default AllUser;