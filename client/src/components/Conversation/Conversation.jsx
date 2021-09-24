import React from 'react'
import "./Conversation.css";
import avatar from "../../image/avatar.jpg";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function Conversation({conversation, currentUser}) {
    const [friend, setFriend] = useState(null);
    const PF = "http://localhost:8800/images/";
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser?._id);
        const getUser = async () => {
        try {
            const res = await axios.get(`/users/profile/${friendId}`);
            setFriend(res.data);
        } catch (err) {
            console.log(err);
        }
        };
        getUser();
    }, [conversation, currentUser])
    return (
        <div className="chat-left-4-member-item">
            <div className="chat-left-4-member-item-img">
                <img src={friend ? (friend.avatar) : (PF + "noAvatar.png")} alt="image" />
                <i className="fas fa-circle"></i>
            </div>
            <div className="chat-left-4-member-item-text">
                <h3>{friend ? friend.username : ""}</h3>
                <p>what are you doing?<span> 10 minutes</span></p>
            </div>
            <div className="chat-left-4-member-item-noti">
                <i className="fas fa-circle"></i>
            </div>
        </div>
    );
};

export default Conversation;


