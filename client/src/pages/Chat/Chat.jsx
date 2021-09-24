import React from 'react'
import { useState } from 'react';
import "./Chat.css";
import avatar from "../../image/avatar.jpg";
import avatar1 from "../../image/avatar1.jpg";
import avatar2 from "../../image/avatar2.jpg";
import avatar3 from "../../image/avatar3.jpg";
import avatar4 from "../../image/avatar4.jpg";

import { useEffect } from 'react';
import { Context } from 'context/Context';
import { useContext } from 'react';
import axios from 'axios';
import Conversation from 'components/Conversation/Conversation';
import { Link } from 'react-router-dom';
import ChatMessage from 'components/ChatMessage/ChatMessage';
import InfoConversation from 'components/InfoConversation/InfoConversation';

function Chat() {
    const [isOpenChatMember, setIsOpenChatMember] = useState(true);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const { user } = useContext(Context);

    useEffect(() => {
       const FetchUser = async () => {
            const res = await axios.get(`/conversations/${user && user._id}`);
            setConversations(res.data);
       }
       FetchUser();
    }, [user && user._id]);
    useEffect(()=> {
        const FetchMessage = async () => {
            try{
                const res = await axios.get(`/messages/${currentChat?._id}`);
                setMessages(res.data);
            } catch(e){
            }
        };
        FetchMessage();
    }, [currentChat])

    return (
        <div className="chat">
            
            <div className="chat-left">
                <div className="chat-left-1">
                    <h2>Chat</h2>
                    <i className="far fa-users-medical" title="Tạo nhóm chat"></i>
                </div>
                <div className="chat-left-2">
                    <input type="text" placeholder="Tìm kiếm theo tên người dùng hoặc nhóm chat" />
                </div>
                <div className="chat-left-3">
                    <span onClick={()=> setIsOpenChatMember(true)} className={isOpenChatMember ? "isActive" : ""} ><i className="fas fa-user-friends"></i>Bạn bè</span>
                    <span onClick={()=> setIsOpenChatMember(false)} className={isOpenChatMember ? "" : "isActive"} ><i className="fas fa-users"></i>Nhóm</span>
                </div>
                <div className="chat-left-4">
                    {isOpenChatMember && <div className="chat-left-4-member">
                        {conversations && conversations.map((conversation, index) => (
                            <div onClick={()=> setCurrentChat(conversation)}>
                                <Link to={`/chat/${conversation?._id}`} style={{textDecoration: 'none', color: 'black'}} >
                                    <Conversation key={index} conversation={conversation} currentUser={user} />
                                </Link>
                            </div>
                        ))}
                                        
                    </div>}
                    {!isOpenChatMember && <div className="chat-left-4-group">

                        <div className="chat-left-4-group-item">
                            <div className="chat-left-4-group-item-img">
                                <img className="item-img-1" src={avatar} alt="image" />
                                <img className="item-img-2" src={avatar1} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>Front-end developers</h3>
                                <p><p style={{display: 'inline-block'}}>Smith:</p>  what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>

                    </div>}
                </div>
            </div>
          
            <div className="chat-center">
                {currentChat ? <ChatMessage messages={messages} currentChat={currentChat} setMessages={setMessages} /> : <span className="chat-text">Chọn cuộc hội thoại để bắt đầu nhắn tin.</span>
                
                }
            </div>
           
            <div className="chat-right">
                <InfoConversation currentChat={currentChat && currentChat}/>
            </div>
        </div>
    )
}

export default Chat;
