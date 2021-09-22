import React from 'react';
import "./MessageReceiver.css";
import avatar from "../../image/avatar.jpg";

function MessageReceiver(props) {
    return (
        <div className="chat-center-2-itemMessage">
            <div className="chat-center-2-itemMessage-img">
                <img src={avatar} alt="image"/>
            </div>
            <div className="chat-center-2-itemMessage-text">
                <p>If the box needs to be a fixed size, or you are keen to ensure that long words can't overflow, then the overflow-wrap property can help. This property will break a word once it is too long to fit on a line by itself.</p>
                <span title="10:03 20-09-2021">5 minutes ago</span>
            </div>
            <div className="chat-center-2-itemMessage-infoMessage">
                <i className="fas fa-reply"></i>
                <i className="fas fa-times"></i>
            </div>
        </div>
    )
}

export default MessageReceiver;
