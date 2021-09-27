import React from 'react'
import { useState } from 'react';
import "./Chat.css";
import avatar from "../../image/avatar.jpg";
import avatar1 from "../../image/avatar1.jpg";
import { useLocation} from 'react-router';
import { useEffect } from 'react';
import { Context } from 'context/Context';
import { useContext } from 'react';
import axios from 'axios';
import Conversation from 'components/Conversation/Conversation';
import ChatMessage from 'components/ChatMessage/ChatMessage';
import InfoConversation from 'components/InfoConversation/InfoConversation';
import ReactTooltip from 'react-tooltip';

function Chat() {
    const [isOpenChatMember, setIsOpenChatMember] = useState(true);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [infoMessageLast, setInfoMessageLast] = useState({});
    const [currentChat, setCurrentChat] = useState(null);
    const { user } = useContext(Context);
    const  [chatId, setChatId] = useState();
    const location = useLocation();

    // GET ALL CONVERSATIONS OF USER
    useEffect(() => {
       const FetchUser = async () => {
            const res = await axios.get(`/conversations/${user && user._id}`);
            setConversations(res.data);
       }
       FetchUser();
    }, [user && user._id]);
    console.log(infoMessageLast);
    // NẾU ĐƯỜNG DẪN CÓ ID CỦA CUỘC NÓI CHUYỆN THÌ LẤY CUỘC NCH ĐÓ
    useEffect(() => {
        setChatId(location.pathname.split("/")[2]);
        console.log(chatId);
        const fetchDataChat = async () => {
            const res = await axios.get(`/conversations/chat/${chatId && chatId}`);
            setCurrentChat(res.data);
        }
        fetchDataChat();
    }, [location, chatId]);

    // LẤY TIN NHẮN CỦA MỘT CUỘC TRÒ CHUYỆN
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
                    <><i className="far fa-users-medical" data-tip="Tạo nhóm chat"></i><ReactTooltip place="bottom" type="dark" effect="solid"/></>
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
                                    <Conversation key={index} conversation={conversation} currentUser={user} infoMessageLast={infoMessageLast} setInfoMessageLast={setInfoMessageLast} />
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
                {currentChat ? <ChatMessage messages={messages} currentChat={currentChat} setMessages={setMessages} infoMessageLast={infoMessageLast} setInfoMessageLast={setInfoMessageLast}/> 
                : <span className="chat-text">Chọn cuộc hội thoại để bắt đầu nhắn tin.</span>
                
                }
            </div>
           
            <div className="chat-right">
                <InfoConversation currentChat={currentChat && currentChat}/>
            </div>
        </div>
    )
}

export default Chat;
