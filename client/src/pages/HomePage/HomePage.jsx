import axios from 'axios';
import NotificationFast from 'components/NotificationFast/NotificationFast';
import { Context } from 'context/Context';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import HomePageContent from '../../components/HomePageContent/HomePageContent';
import Leftbar from '../../components/Leftbar/Leftbar';
import Rightbar from '../../components/Rightbar/Rightbar';
import "./HomePage.css";
function HomePage() {
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

    return (
        <div className="homePage">
            <div className="homePage-content">
                <div className="homePage-left">
                    <Leftbar />
                </div>
                <div className="homePage-center">
                    <HomePageContent />
                </div>
                <div className="homePage-right">
                    <Rightbar />
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
        </div>
    );
}

export default HomePage;