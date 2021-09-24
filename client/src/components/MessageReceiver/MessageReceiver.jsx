import React from 'react';
import "./MessageReceiver.css";
import avatar from "../../image/avatar.jpg";
import { format } from 'timeago.js';

function formatTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();
    const d = date.getDate();
    const mon = date.getMonth() + 1;
    const y = date.getFullYear();

    return h+":" +m  + " " +d + "-"+ mon + "-" +y;
}

function MessageReceiver({message, friendAvatar}) {
    return (
        <div className="chat-center-2-itemMessage">
            <div className="chat-center-2-itemMessage-img">
                <img src={friendAvatar} alt="image"/>
            </div>
            <div className="chat-center-2-itemMessage-text" title={formatTime(message.createdAt)}>
                <p>{message.content}</p>
                {/* <span >{format(message.createdAt)}</span> */}
            </div>
            <div className="chat-center-2-itemMessage-infoMessage">
                <i className="fas fa-reply"></i>
                <i className="fas fa-times"></i>
            </div>
        </div>
    )
}

export default MessageReceiver;
