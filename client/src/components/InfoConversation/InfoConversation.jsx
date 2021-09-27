import React from 'react'
import "./InfoConversation.css";
import avatar from "../../image/avatar.jpg";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from 'context/Context';
import { Link } from 'react-router-dom';

function InfoConversation ({currentChat}) {
    const [settingChat, setSettingChat] = useState(0);
    const [friend, setFriend] = useState(null);
    const { user } = useContext(Context);
    const PF = "http://localhost:8800/images/";

    useEffect(() => {
        const friendId = currentChat && currentChat.members.find((m) => m !== user._id);
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
    return (
        <div>
            <div className="chat-right-1">
                    <div className="chat-right-1-img">
                        {friend && <Link 
                         to={`/profile/${friend && friend._id}`} 
                         style={{textDecoration: "none", color: "black"}}
                        >
                            <img src={friend ? friend.avatar : (PF + "noAvatar.png")} alt="image"/>
                        </Link>}
                    </div>
                    <div className="chat-right-1-info">
                        {friend && <Link 
                         to={`/profile/${friend && friend._id}`} 
                         style={{textDecoration: "none", color: "black"}}
                        >
                            <p>{friend ? friend.username : ""}</p>   
                        </Link> }                  
                    </div>
                </div>
            <div className="chat-right-2">
                {friend && 
                <>
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
                        {/* <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} /> */}
                    </div>
                </>
                }
            </div>
        </div>
    )
}

export default InfoConversation;

