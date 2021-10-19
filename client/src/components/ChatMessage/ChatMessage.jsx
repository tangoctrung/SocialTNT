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
import URL from 'config/config';
import {formatTime} from '../../config/reserveArr';
import {storage} from '../../firebase';

function ChatMessage({messages, currentChat, setMessages}) {
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    const [friend, setFriend] = useState(null);
    const { user, socket, accessToken } = useContext(Context);
    const [newMessage, setNewMessage] = useState("");
    const listMessageRef = useRef();
    const inputChatRef = useRef();
    const PF = URL.urlNoAvatar;
    const [images, setImages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isReply, setIsReply] = useState(false);
    const [textReply, setTextReply] = useState("");
    const [nameReply, setNameReply] = useState("");
    const receivedId = currentChat.members.find(member => member !== user?._id);
    const [isOpenFileMenu, setIsOpenFileMenu] = useState(false);


    useEffect(() => {
        socket?.emit("addUser", user?._id);
        // socket?.on("getUser", (users) => {
        // });
    }, [user?._id])

    // lấy tin nhắn
    useEffect(() => {
        socket?.on('typingToClient', ({senderId, typing}) => {
            if (currentChat?.members.includes(senderId?._id) && senderId?._id !== user?._id) {
                 setIsTyping(typing);
            }
        })
        socket?.on("getMessage", data => {
            console.log(data);
            let listImage=[], i;
            for (i=0; i<data?.url?.length; i++) {
                listImage.push(data.url[i]);
            }
            const newMessage = data;
            if (currentChat?.members.includes(newMessage?.senderId?._id)) {
                setMessages((prev) => [...prev, newMessage]);
            }
        })
    }, [])



    // lấy thông tin của bạn bè trong currentChat
    useEffect(() => {
        const friendId = currentChat?.members.find((m) => m !== user?._id);
        const getUser = async () => {
            try {
                const res = await axios.get(`/users/profile/${friendId}`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                      }
                });
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
            content: newMessage,
            typeMessage: images.length>0 ? "image" : "text",
            url: [...images],
            isReply: isReply,
            contentReply: textReply,
            personIdReply: nameReply,
        }
        const receivedId = currentChat.members.find(member => member !== user?._id)
        
        if (newMessage || images){
            const res = await axios.post(`/messages/`, message);
            const m = {
                ...res.data,
                senderId: {
                    _id: user?._id,
                    username: user?.username,
                }
            };
            setMessages([...messages, m]);
            await axios.put(`/conversations/${currentChat?._id}`, {
                messageLast: images.length > 0 ? "Đã gửi hình ảnh" : newMessage,
                senderId: user?._id
            })          
            socket?.emit('sendMessage', {
                m,
                receivedId,
            });
            setNewMessage("");
            setImages([]);
            setIsReply(false);
        }
    }

    // thêm emoji
    const onEmojiClick = (event, data) => {
        let m = newMessage;
        m += data.emoji;
        setNewMessage(m)
    }

    
    
    // chọn ảnh để gửi
    const handleChooseImage = (e) => {
        setIsOpenFileMenu(false);
        let files = [...e.target.files];
        let newImages = [...images];
        var date = Date.now();
        var date1 = formatTime(date);
        files.forEach(file => {
            const uploadTask = storage.ref(`imageChat/${currentChat?._id}/${user?._id},${user?.username}/${date1}/${file.name}`).put(file);
            uploadTask.on('state_changed', 
                (snapshot) => {}, 
                (error) => { alert(error)}, 
                () => {
                    // complete function ....
                    storage.ref(`imageChat/${currentChat?._id}/${user?._id},${user?.username}/${date1}`).child(file.name).getDownloadURL().then(url => {
                        newImages.push(url);
                        setImages([...newImages]);
                        console.log(url);
                    })
                });
        });
    }

    // chọn video để gửi
    const handleChooseVideo = (e) => {
        setIsOpenFileMenu(false);
    }

    // chọn tài liệu để gửi
    const handleChooseDocument = (e) => {
        setIsOpenFileMenu(false);
    }

    

    // delete image is selected
    const handleRemoveImageItem = (index) => {
        let newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

    }
     
    // khi người dùng đang gõ phím thì gửi đến cho người kia
    const handlePressKey = () => {
        const receivedId = currentChat.members.find(member => member !== user?._id);
        socket?.emit('typing', {
            senderId: user?._id,
            receivedId,
            typing: true,
        });
    }

    // khi người dùng nhập text 
    const handleChangeTextChat = (e) => {
        setNewMessage(e.target.value);
    }

    return (       
            <div>
                <div className="chat-center-1">
                    <div className="chat-center-1-infoUser">
                        <div className="chat-center-1-infoUser-img">
                            <Link to={`/profile/${friend ? friend._id : ""}`} style={{textDecoration: "none", color: "black"}}><img src={friend ? friend.avatar : (PF)} alt="image" /></Link>
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
                            <img src={friend ? friend.avatar : (PF)} alt="image"/>
                            <h3>{friend && friend.username}</h3>
                            <p>Tham gia từ <b>{friend && format(friend.createdAt)}</b> trước.</p>
                        </div>
                        <div className="chat-center-2-listMessage">
                            {messages && messages.map((message, index) => 
                                <div key={index} ref={listMessageRef}>
                                    {message?.senderId?._id === user?._id 
                                    ? <MessageSender message={message} receivedId={receivedId} setIsReply={setIsReply} setNameReply={setNameReply} setTextReply={setTextReply} /> 
                                    : <MessageReceiver message={message} setIsReply={setIsReply} setNameReply={setNameReply} setTextReply={setTextReply} />}
                                </div>
                            )}    
                        </div>
                        <div className="typing">
                            {isTyping && 
                                <div className="balls">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>}
                        </div>
                    </div>
                </div>
                <div className="chat-center-3">

                    {images.length > 0 && 
                        <div 
                            className="chat-center-3-top" 
                            style={{height: images.length > 0 ? "100px" : "70px"}}
                        >
                            {images.length>0 && images.map((image,index) => (
                                <div className="chat-center-3-top-item" key={index} >
                                    <img src={image} />     
                                    <i 
                                        className="fas fa-times-circle"
                                        onClick={() => handleRemoveImageItem(index)}
                                    >
                                    </i>                       
                                </div>
                            ))}
                        </div>}

                    {isReply && <div className="chat-center-3-reply">
                        <div className="chat-center-3-reply-icon" onClick={() => setIsReply(false)}>
                            <i className="fas fa-times"></i>
                        </div>
                        <div className="chat-center-3-reply-text">
                            <p>Đang trả lời <b style={{color: 'black'}}>{nameReply}</b>:</p>
                            <p>{textReply}</p>               
                        </div>
                    </div>}

                    <div className="chat-center-3-bottom">
                        <div className="chat-center-3-micro chat-center-3-itemIcon">
                            <><i className="fas fa-microphone" data-tip="Gửi voice chat"></i><ReactTooltip place="bottom" type="dark" effect="solid"/></>
                        </div>
                        <div className="chat-center-3-file chat-center-3-itemIcon">
                            <div className="chat-center-3-file-icon" onClick={() => setIsOpenFileMenu(!isOpenFileMenu)}>
                                <i className="fas fa-paperclip"></i>
                            </div>
                            {isOpenFileMenu && 
                                <div className="chat-center-3-file-menu">
                                    <label htmlFor="chooseImageToSend" className="chat-center-file-item">
                                        <i className="far fa-images"></i>
                                        <span>Hình ảnh</span>
                                        <input 
                                            type="file" 
                                            id="chooseImageToSend" 
                                            style={{display: "none"}} 
                                            onChange={handleChooseImage}
                                            accept="image/*"
                                            multiple
                                        />
                                    </label>
                                    <label htmlFor="chooseVideoToSend" className="chat-center-file-item">
                                        <i className="far fa-file-video"></i>
                                        <span>Video</span>
                                        <input 
                                            type="file" 
                                            id="chooseVideoToSend" 
                                            style={{display: "none"}} 
                                            onChange={handleChooseVideo}
                                            accept="video/*"
                                            multiple
                                        />
                                    </label>
                                    <label htmlFor="chooseDocToSend" className="chat-center-file-item">
                                        <i className="far fa-file-alt"></i>
                                        <span>Tài liệu</span>
                                        <input 
                                            type="file" 
                                            id="chooseDocToSend" 
                                            style={{display: "none"}} 
                                            onChange={handleChooseDocument}
                                            multiple
                                        />
                                    </label>
                                </div>}                 
                        </div>
                        <form className="chat-center-3-input" >
                            <textarea type="text" 
                                ref={inputChatRef} 
                                placeholder="Nhập tin nhắn muốn gửi" 
                                onChange={(e) => handleChangeTextChat(e)} 
                                value={newMessage} 
                                onFocus={()=> {setIsOpenEmoji(false); setIsOpenFileMenu(false)}} 
                                // onClick={handlePressKey}
                                // onKeyPress={handlePressKey}
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
            </div>
    )
}

export default ChatMessage;


