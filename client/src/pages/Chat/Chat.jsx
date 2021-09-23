import React from 'react'
import { useState } from 'react';
import "./Chat.css";
import avatar from "../../image/avatar.jpg";
import avatar1 from "../../image/avatar1.jpg";
import avatar2 from "../../image/avatar2.jpg";
import avatar3 from "../../image/avatar3.jpg";
import avatar4 from "../../image/avatar4.jpg";
import MessageSender from 'components/MessageSender/MessageSender';
import MessageReceiver from 'components/MessageReceiver/MessageReceiver';
import { useEffect } from 'react';
import { Context } from 'context/Context';
import { useContext } from 'react';
import axios from 'axios';
import Conversation from 'components/Conversation/Conversation';
import { Link } from 'react-router-dom';

function Chat() {
    const [isOpenChatMember, setIsOpenChatMember] = useState(true);
    const [settingChat, setSettingChat] = useState(0);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const { user } = useContext(Context);
    useEffect(() => {
       const FetchUser = async () => {
            const res = await axios.get(`/conversations/${user._id}`);
            setConversations(res.data);
       }
       FetchUser();
    }, [user._id]);
    useEffect(()=> {
        console.log(currentChat);
        const FetchMessage = async () => {
            try{
                const res = await axios.get(`/messages/${currentChat?._id}`);
                setMessages(res.data);
            } catch(e){
                console.log(e);
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
                {currentChat ? <>
                    <div className="chat-center-1">
                    <div className="chat-center-1-infoUser">
                        <div className="chat-center-1-infoUser-img">
                            <img src={avatar} alt="image" />
                            <i className="fas fa-circle"></i>
                        </div>
                        <div className="chat-center-1-infoUser-name">
                            <b>John Smith</b> <br/>
                            <span>Đang hoạt động</span>
                        </div>
                    </div>
                    <div className="chat-center-1-call-call">
                        <i className="fas fa-video"></i>
                    </div>
                </div>
                    <div className="chat-center-2">
                    <div className="chat-center-2-container">
                        <div className="chat-center-2-infoUser">
                            <img src={avatar} alt="image"/>
                            <h3>John Smith</h3>
                            <p>Tham gia từ <b>3 năm</b> trước.</p>
                        </div>
                        <div className="chat-center-2-listMessage">
                            {messages && messages.map((message, index) => 
                                <div key={index}>
                                {message.senderId === user._id ? <MessageSender message={message} /> : <MessageReceiver message={message} />}
                                </div>
                            )}
                            
                            {/* <MessageSender />
                            
                            <MessageReceiver />
                            <MessageSender />
                            <MessageReceiver /> */}
                        </div>
                    </div>
                </div>
                    <div className="chat-center-3">
                    <div className="chat-center-3-micro">
                        <i className="fas fa-microphone" title="Gửi voice chat"></i>
                    </div>
                    <div className="chat-center-3-file">
                        <i className="fas fa-paperclip" title="Gửi ảnh, video, file"></i>
                    </div>
                    <div className="chat-center-3-input">
                        <input type="text" placeholder="Nhập tin nhắn muốn gửi" />
                    </div>
                    <div className="chat-center-3-emoji">
                        <i className="fas fa-smile" title="Gửi biểu tượng cảm xúc"></i>
                    </div>
                </div>
                </> : <span className="chat-text">Chọn cuộc hội thoại để bắt đầu nhắn tin.</span>
                
                }
            </div>
           
            <div className="chat-right">
                <div className="chat-right-1">
                    <div className="chat-right-1-img">
                        <img src={avatar} alt="image"/>
                    </div>
                    <div className="chat-right-1-info">
                        <p>John Smith</p>                      
                    </div>
                </div>
                <div className="chat-right-2">
                    <div className="chat-right-2-selection">
                        <div className="chat-right-2-selection-1">
                            <div className={settingChat !== 1 ? "chat-right-2-list-1" : "chat-right-2-list-1 isActive"} onClick={()=> setSettingChat(1)}>
                                <i className="fas fa-film"></i>  
                                <span> Chủ đề</span>
                            </div>
                            <div className={settingChat !== 2 ? "chat-right-2-list-1" : "chat-right-2-list-1 isActive"} onClick={()=> setSettingChat(2)}>
                                <i className="fas fa-wrench"></i>  
                                <span> Cài đặt</span>
                            </div>
                        </div>
                        <div className="chat-right-2-selection-2">
                            <div className={settingChat !== 3 ? "chat-right-2-list-1" : "chat-right-2-list-1 isActive"} onClick={()=> setSettingChat(3)}>
                                <i className="fas fa-photo-video"></i>  
                                <span> Hình ảnh, video</span>
                            </div>
                            <div className={settingChat !== 4 ? "chat-right-2-list-1" : "chat-right-2-list-1 isActive"} onClick={()=> setSettingChat(4)}>
                                <i className="fas fa-paperclip"></i>  
                                <span> Tệp</span>
                            </div>
                            <div className={settingChat !== 5 ? "chat-right-2-list-1" : "chat-right-2-list-1 isActive"} onClick={()=> setSettingChat(5)}>
                                <i className="fas fa-link"></i>  
                                <span> Liên kết</span>
                            </div>
                        </div>
                    </div>
                    <div className="chat-right-2-content">
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />

                    </div>
 
                    
                </div>
            </div>
        </div>
    )
}

export default Chat;
