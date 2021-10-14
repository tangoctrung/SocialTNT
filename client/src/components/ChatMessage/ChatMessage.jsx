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
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

function ChatMessage({messages, currentChat, setMessages, isLoadingMessages}) {
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    const [friend, setFriend] = useState(null);
    const { user, socket } = useContext(Context);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const listMessageRef = useRef();
    const inputChatRef = useRef();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    // lấy tin nhắn
    useEffect(() => {
        socket?.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                content: data.content,
                createdAt: Date.now(),
            })
        })
    }, [])

    // thêm tin nhắn nhận dc vào messages
    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    // lấy thông tin của bạn bè trong currentChat
    useEffect(() => {
        const friendId = currentChat?.members.find((m) => m !== user?._id);
        const getUser = async () => {
            try {
                const res = await axios.get(`/users/profile/${friendId}`);
                setFriend(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentChat])

    // lăn chuột đến cuối hộp chat
    useEffect(() => {
        listMessageRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages])

    // gửi tin nhắn
    const handleSubmitFormSendMessage = async (e) => {
        e.preventDefault();
        const message = {
            senderId: user?._id,
            conversationId: currentChat._id,
            content: newMessage
        }
        const receivedId = currentChat.members.find(member => member !== user?._id)
        socket?.emit('sendMessage', {
            senderId: user?._id,
            receivedId,
            content: newMessage,
        });
        if (newMessage){
            const res = await axios.post(`/messages/`, message);
            setMessages([...messages, res.data]);
            await axios.put(`/conversations/${currentChat?._id}`, {
                messageLast: newMessage,
                senderId: user?._id
            })          
            setNewMessage("");
        }
    }

    // thêm emoji
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
                            <Link to={`/profile/${friend ? friend._id : ""}`} style={{textDecoration: "none", color: "black"}}><img src={friend ? friend.avatar : (PF + "noAvatar.png")} alt="image" /></Link>
                            <i className="fas fa-circle"></i>
                        </div>
                        <div className="chat-center-1-infoUser-name">
                            <Link to={`/profile/${friend ? friend._id : ""}`} style={{textDecoration: "none", color: "black"}}><b>{friend && friend.username}</b> <br/></Link>
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
                            {messages && !isLoadingMessages && messages.map((message, index) => 
                                <div key={index} ref={listMessageRef}>
                                {message.senderId === user?._id ? <MessageSender message={message} /> : <MessageReceiver message={message} friendAvatar={friend && friend.avatar}  />}
                                </div>
                            )}    
                            {isLoadingMessages && 
                                <div className="chat-center-loading"> 
                                    <div className="spinner-2"></div>
                                    <p>Đang tải...</p> 
                                </div>}          
                        </div>
                    </div>
                </div>
                <div className="chat-center-3">
                    <div className="chat-center-3-micro chat-center-3-itemIcon">
                        <><i className="fas fa-microphone" data-tip="Gửi voice chat"></i><ReactTooltip place="bottom" type="dark" effect="solid"/></>
                    </div>
                    <div className="chat-center-3-file chat-center-3-itemIcon">
                        <label htmlFor="chooseFileToSend">
                            <><i className="fas fa-paperclip" data-tip="Gửi ảnh, video, file"></i><ReactTooltip place="bottom" type="dark" effect="solid"/></>
                        </label>
                        <input type="file" id="chooseFileToSend" style={{display: "none"}} multiple />
                    </div>
                    <form className="chat-center-3-input" onSubmit={handleSubmitFormSendMessage}>
                        <textarea type="text" 
                            ref={inputChatRef} 
                            placeholder="Nhập tin nhắn muốn gửi" 
                            onChange={(e)=> setNewMessage(e.target.value)} 
                            value={newMessage} 
                            onFocus={()=> setIsOpenEmoji(false)} 
                        ></textarea>
                    </form>
                    <div className="chat-center-3-emoji chat-center-3-itemIcon">
                        <><i className="fas fa-smile" data-tip="Gửi biểu tượng cảm xúc" onClick={()=> setIsOpenEmoji(!isOpenEmoji)}></i><ReactTooltip place="bottom" type="dark" effect="solid"/></>
                        {isOpenEmoji && <div className="chat-center-3-picker">
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>}
                    </div>
                    <div className="chat-center-3-emoji chat-center-3-itemIcon">
                        <><i className="fas fa-paper-plane" data-tip="Nhấn để gửi tin nhắn" onClick={handleSubmitFormSendMessage}></i><ReactTooltip place="bottom" type="dark" effect="solid"/></>                   
                    </div>
                </div>
            </div>
    )
}

export default ChatMessage;


