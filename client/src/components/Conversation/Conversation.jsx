import React from 'react'
import "./Conversation.css";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';


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
        <Link to={`/chat/${conversation?._id}`} style={{textDecoration: 'none', color: 'black'}} >
            <div className="chat-left-4-member-item">
                <div className="chat-left-4-member-item-img">
                    <img src={friend ? (friend.avatar) : (PF + "noAvatar.png")} alt="image" />
                    <i className="fas fa-circle"></i>
                </div>
                <div className="chat-left-4-member-item-text">
                    <h3>{friend ? friend.username : ""}</h3>
                    {conversation?.senderId === currentUser?._id 
                        && conversation?.messageLast 
                        && <p><b>You:</b> {conversation?.messageLast.length > 30 ? conversation?.messageLast.slice(0, 30) + "..." : conversation?.messageLast} - <span>{format(conversation.updatedAt)}</span></p>}
                    {conversation?.senderId !== currentUser?._id 
                        && conversation?.messageLast 
                        && <p>{conversation?.messageLast.length > 35 ? conversation?.messageLast.slice(0, 35) + "..." : conversation?.messageLast}  - <span>{format(conversation.updatedAt)}</span></p>}                 
                </div>
                <div className="chat-left-4-member-item-noti">
                    <i className="fas fa-circle"></i>
                </div>
            </div>
        </Link>

    );
};

export default Conversation;


