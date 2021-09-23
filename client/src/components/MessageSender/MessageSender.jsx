import React from 'react'
import { format } from 'timeago.js';
import "./MessageSender.css";

function formatTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();
    const d = date.getDate();
    const mon = date.getMonth() + 1;
    const y = date.getFullYear();

    return h+":" +m  + " " +d + "-"+ mon + "-" +y;
}

function MessageSender({message}) {
    return (
        <div className="chat-center-2-itemMessage-sender">
            <div className="chat-center-2-itemMessage-sender-infoMessage">
                <i className="fas fa-reply"></i>
                <i className="fas fa-times"></i>
            </div>
            <div className="chat-center-2-itemMessage-sender-text">
                <p>{message.content}</p>
                <span title={formatTime(message.createdAt)}>{format(message.createdAt)}</span>
            </div>
        </div>
    )
}

export default MessageSender;


