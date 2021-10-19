import axios from 'axios';
import { Context } from 'context/Context';
import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
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

function MessageSender({message, receivedId, setIsReply, setNameReply, setTextReply}) {

    const [isDelete, setIsDelete] = useState(message?.isDelete);
    const { user, socket } = useContext(Context);
    const handleSetTextReply = () => {
        
        setNameReply("chính bạn");
       
        if (message?.typeMessage !== "text") {
            if (message?.content === "") {
                setTextReply(`${message?.typeMessage} đính kèm`)
            } else {
                if (message?.content?.length >= 100) {
                    setTextReply(message?.content?.slice(0,100) + "...");
                } else {
                    setTextReply(message?.content);
                }
            }
        } else {
            if (message?.content?.length >= 100) {
                setTextReply(message?.content?.slice(0,100) + "...");
            } else {
                setTextReply(message?.content);
            }
        }
        // setTextReply(message?.content); 
        setIsReply(true)
    }
    const handleDeleteMessage = async () => {
        setIsDelete(true);
        const newMessage = {
            messageId: message?._id,
        }
        await axios.put('/messages/delete', newMessage);

        socket?.emit('deleteMessage', {
            messageId: message?._id,
            receivedId: receivedId,
        })

    }

    return (
        <>
            {!isDelete ?
                <div className="chat-center-2-itemMessage-sender">
                    <div className="chat-center-2-itemMessage-sender-infoMessage">
                        <div className="iconDelete">
                            <i className="fas fa-times" onClick={handleDeleteMessage}></i>
                        </div>
                        <div className="iconReply">
                            <i className="fas fa-reply" onClick={handleSetTextReply}></i>
                        </div>
                    </div>
                    <div className="chat-center-2-itemMessage-sender-text" title={formatTime(message.createdAt)}>
                        {/* {message.typeMessage==="text" && <p>{message.content}</p>} */}
                        {message?.isReply && 
                            <div className="chat-center-2-textReply">
                                <div>
                                    <p>{`Đang trả lời `} 
                                        <b>{user?.username === message?.personIdReply ? "chính bạn" : message?.personIdReply}</b>
                                    </p>
                                </div>
                                <div>
                                    <p>{message?.contentReply?.length > 100 ? message?.contentReply.slice(0, 100) + "..." : message?.contentReply }</p>
                                </div>
                            </div> 
                        }
                        <div className="itemMessage-sender-text">
                            {message?.content !=="" && <p>{message?.content}</p>}
                        </div>
                        <div className="itemMessage-sender-image">
                            {message?.url?.length > 0 && message?.url.map((itemUrl, index) => (
                                    <img src={itemUrl} alt="image" key={index} />
                            ))}
                        </div>
        
                    </div>
                </div> :
                <div className="chat-center-2-itemMessage-sender-delete">
                    <p>Tin nhắn đã bị xóa</p>
                </div>         
            }
        </>
    )
}

export default MessageSender;


