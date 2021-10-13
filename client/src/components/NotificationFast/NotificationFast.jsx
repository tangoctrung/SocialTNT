import { Context } from 'context/Context';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./NotificationFast.css";

function NotificationFast({noti}) {
    const {user} = useContext(Context);
    console.log(noti);
    return (
        <Link 
            to={`/post/${noti?.postNotiId}`} 
            style={{textDecoration: "none", color: "black"}} 
            className="notificationFast"
        >
            <div className="notificationFast-img"> 
                <img src={noti?.senderNotiId?.avatar} alt="image" />
            </div>
            <div className="notificationFast-info">
                <p className="notificationFast-content">
                    <b style={{marginRight: "5px"}}>{noti?.senderNotiId?.username}</b> 
                    <span>{noti.typeNoti !== "commentPost" && noti.typeNoti !== "replyCommentPost" && noti?.content.slice(0, 50)}</span>  
                    <span>{noti.typeNoti === "commentPost"                     
                        && "đã bình luận bài viết của bạn."}</span>
                    <span>{noti.typeNoti === "replyCommentPost"
                        && user?._id === noti.receiverNotiId[0] && user?._id === noti.receiverNotiId[1]
                        && "đã bình luận trong bài viết của bạn."}</span> 
                    <span>{noti.typeNoti === "replyCommentPost"
                        && user?._id === noti.receiverNotiId[0] && user?._id !== noti.receiverNotiId[1]
                        && "đã trả lời một bình luận trong bài viết của bạn."}</span> 
                    <span>{noti.typeNoti === "replyCommentPost"
                        && user?._id === noti.receiverNotiId[1] && user?._id !== noti.receiverNotiId[0]
                        && "đã trả lời bình luận của bạn."}</span> 
                </p>            
            </div>
        </Link>
    );
}

export default NotificationFast;