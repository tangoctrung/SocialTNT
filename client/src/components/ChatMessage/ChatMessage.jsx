import React from 'react'
import "./ChatMessage.css";
import { Context } from 'context/Context';
import { useContext } from 'react';
import MessageSender from 'components/MessageSender/MessageSender';
import MessageReceiver from 'components/MessageReceiver/MessageReceiver';
import { useEffect } from 'react';
import { format } from 'timeago.js';
import axios from 'axios';
import { useState } from 'react';
import { useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

function ChatMessage({messages, currentChat, setMessages}) {
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    const [friend, setFriend] = useState(null);
    const { user } = useContext(Context);
    const [newMessage, setNewMessage] = useState("");
    const listMessageRef = useRef();
    const inputChatRef = useRef();
    const PF = "http://localhost:8800/images/";
    useEffect(() => {
        const friendId = currentChat.members.find((m) => m !== user._id);
        const getUser = async () => {
            try {
                const res = await axios.get(`/users/profile/${friendId}`);
                console.log(res.data);
                setFriend(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentChat])
    
    useEffect(() => {
        listMessageRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages])

    const handleSubmitFormSendMessage = async (e) => {
        e.preventDefault();
        const message = {
            senderId: user._id,
            conversationId: currentChat._id,
            content: newMessage
        }
        if (newMessage){
            const res = await axios.post(`/messages/`, message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        }
    }

    const onEmojiClick = (event, data) => {
        let m = newMessage;
        m += data.emoji;
        setNewMessage(m)
    }
    return (
        <div>
            <div className="chat-center-1">
                <div className="chat-center-1-infoUser">
                    <div className="chat-center-1-infoUser-img">
                        <img src={friend ? friend.avatar : (PF + "noAvatar.png")} alt="image" />
                        <i className="fas fa-circle"></i>
                    </div>
                    <div className="chat-center-1-infoUser-name">
                        <b>{friend && friend.username}</b> <br/>
                        <span>Đang hoạt động</span>
                    </div>
                </div>
                <div className="chat-center-1-call-call">
                    <i className="fas fa-video"></i>
                </div>
            </div>
            <div className="chat-center-2">
                <div className="chat-center-2-container" >
                    <div className="chat-center-2-infoUser">
                        <img src={friend ? friend.avatar : (PF + "noAvatar.png")} alt="image"/>
                        <h3>{friend && friend.username}</h3>
                        <p>Tham gia từ <b>{friend && format(friend.createdAt)}</b> trước.</p>
                    </div>
                    <div className="chat-center-2-listMessage">
                        {messages && messages.map((message, index) => 
                            <div key={index} ref={listMessageRef}>
                            {message.senderId === user._id ? <MessageSender message={message} /> : <MessageReceiver message={message} />}
                            </div>
                        )}              
                    </div>
                </div>
            </div>
            <div className="chat-center-3">
                <div className="chat-center-3-micro chat-center-3-itemIcon">
                    <i className="fas fa-microphone" title="Gửi voice chat"></i>
                </div>
                <div className="chat-center-3-file chat-center-3-itemIcon">
                    <label htmlFor="chooseFileToSend">
                        <i className="fas fa-paperclip" title="Gửi ảnh, video, file"></i>
                    </label>
                    <input type="file" id="chooseFileToSend" style={{display: "none"}} multiple />
                </div>
                <form className="chat-center-3-input" onSubmit={handleSubmitFormSendMessage}>
                    <input type="text" 
                        ref={inputChatRef} 
                        placeholder="Nhập tin nhắn muốn gửi" 
                        onChange={(e)=> setNewMessage(e.target.value)} 
                        value={newMessage} 
                        onFocus={()=> setIsOpenEmoji(false)} 
                    />
                </form>
                <div className="chat-center-3-emoji chat-center-3-itemIcon">
                    <i className="fas fa-smile" title="Gửi biểu tượng cảm xúc" onClick={()=> setIsOpenEmoji(!isOpenEmoji)}></i>
                    {isOpenEmoji && <div className="chat-center-3-picker">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ChatMessage;


