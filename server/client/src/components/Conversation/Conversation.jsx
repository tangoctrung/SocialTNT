import React from 'react'
import "./Conversation.css";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import URL from 'config/config';
import { useContext } from 'react';
import { Context } from 'context/Context';
import { axiosInstance } from 'config/configUrl';


function Conversation({conversation, currentUser, lastMessage}) {
    const [friend, setFriend] = useState(null);
    const PF = URL.urlNoAvatar;
    const { accessToken } = useContext(Context);
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser?._id);
        const getUser = async () => {
            try {
                const res = await axiosInstance.get(`/users/profile/${friendId}`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                });
                setFriend(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [conversation, currentUser])
    return (
        <Link to={`/chat/${conversation?._id}`} style={{textDecoration: 'none', color: 'black'}} >
            <div className="chat-left-4-member-item">
                <div className="chat-left-4-member-item-img">
                    <img src={friend ? (friend.avatar) : (PF)} alt="image" />
                    <i className="fas fa-circle"></i>
                </div>
                <div className="chat-left-4-member-item-text">
                    <h3>{friend ? friend.username : ""}</h3>
                    {conversation?.senderId === currentUser?._id && conversation?._id !== lastMessage?.conversationId
                        && <p>You: {conversation?.messageLast.length > 35 ? conversation?.messageLast.slice(0, 35) + "..." : conversation?.messageLast} - <span>{format(conversation.updatedAt)}</span></p>}
                    {conversation?.senderId !== currentUser?._id && conversation?._id !== lastMessage?.conversationId
                        && <p>{conversation?.messageLast.length > 40 ? conversation?.messageLast.slice(0, 40) + "..." : conversation?.messageLast}  - <span>{format(conversation.updatedAt)}</span></p>}                 
                    {lastMessage && lastMessage?.senderId !== currentUser?._id && lastMessage?.conversationId === conversation?._id
                        && <p>{lastMessage?.messageLast?.length > 40 ? lastMessage?.messageLast.slice(0, 40) + "..." :lastMessage?.messageLast}  - <span>{format(lastMessage?.updatedAt)}</span></p>}
                    {lastMessage && lastMessage?.senderId === currentUser?._id && lastMessage?.conversationId === conversation?._id
                        && <p>You: {lastMessage?.messageLast?.length > 35 ? lastMessage?.messageLast.slice(0, 35) + "..." : lastMessage?.messageLast}  - <span>{format(lastMessage?.updatedAt)}</span></p>}
                </div>
                <div className="chat-left-4-member-item-noti">
                    {/* <i className="fas fa-circle"></i> */}
                </div>
            </div>
        </Link>

    );
};

export default Conversation;

