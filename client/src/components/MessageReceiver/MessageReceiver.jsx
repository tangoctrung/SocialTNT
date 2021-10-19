import { Context } from 'context/Context';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import "./MessageReceiver.css";

function formatTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();
    const d = date.getDate();
    const mon = date.getMonth() + 1;
    const y = date.getFullYear();

    return h+":" +m  + " " +d + "-"+ mon + "-" +y;
}

function MessageReceiver({message, setIsReply, setNameReply, setTextReply}) {

    const { user, socket } = useContext(Context);
    const [isDelete, setIsDelete] = useState(message?.isDelete);
    useEffect(() => {
        socket?.on('deleteMessageToClient', ({messageId}) => {
            if (message?._id === messageId) {
                setIsDelete(true);
            }
        })
    }, [])
    const handleSetTextReply = () => {
        
        setNameReply(message?.senderId?.username);
        
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
    return (
        <>
        {!isDelete ?
            <div className="chat-center-2-itemMessage">
                {/* <div className="chat-center-2-itemMessage-img">
                    <img src={friendAvatar} alt="image"/>
                </div> */}
                <div className="chat-center-2-itemMessage-text" title={formatTime(message.createdAt)}>

                    {message?.isReply && 
                        <div className="chat-center-2-receiver-textReply">
                            <div>
                                <p>{`Đang trả lời `} 
                                    <b>{user?.username === message?.personIdReply ? "bạn" : "chính họ"}</b>
                                </p>
                            </div>
                            <div>
                                <p>{message?.contentReply?.length > 100 ? message?.contentReply.slice(0, 100) + "..." : message?.contentReply }</p>
                            </div>
                        </div> 
                    }

                    <div className="itemMessage-text">
                        {message.content !=="" && <p>{message.content}</p>}
                    </div>

                    <div className="itemMessage-image">
                        {message?.url?.length > 0 && message?.url.map((itemUrl, index) => (
                                <img src={itemUrl} alt="image" key={index} />
                        ))}
                    </div>
                </div>
                <div className="chat-center-2-itemMessage-infoMessage">
                    <div className="iconReply">
                        <i 
                            className="fas fa-reply"
                            onClick={handleSetTextReply}
                        ></i>
                    </div>
                </div>
            </div> :
            <div className="chat-center-2-itemMessage-delete">
                <p>Tin nhắn đã bị xóa</p>
            </div>
        }
        </>
    )
}

export default MessageReceiver;
