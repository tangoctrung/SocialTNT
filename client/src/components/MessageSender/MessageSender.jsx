import React from 'react'
import "./MessageSender.css";


function MessageSender(props) {
    return (
        <div className="chat-center-2-itemMessage-sender">
            <div className="chat-center-2-itemMessage-sender-infoMessage">
                <i className="fas fa-reply"></i>
                <i className="fas fa-times"></i>
            </div>
            <div className="chat-center-2-itemMessage-sender-text">
                <p>If the box needs to be a fixed size, or you are keen to ensure that long words can't overflow, then the overflow-wrap property can help. This property will break a word once it is too long to fit on a line by itself.</p>
                <span title="10:03 20-09-2021">5 minutes ago</span>
            </div>
        </div>
    )
}

export default MessageSender;


