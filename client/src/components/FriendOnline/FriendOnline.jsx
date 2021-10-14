import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { format } from 'timeago.js';
import "./FriendOnline.css";

function FriendOnline({friendId}) {

    const [friend, setFriend] = useState();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect( async () => {
        const resFriend = await axios.get(`/users/profile/${friendId}`);
        setFriend(resFriend.data);
    }, [friendId])
    return (
        <div>
            <div className="rightbar-item">
                    <div className="rightbar-item-friend">
                        <div className="rightbar-item-friend-image">
                            <img src={friend?.avatar || (PF + "noAvatar.png") } alt="Hình ảnh" />
                            <i className="fas fa-circle"></i>
                        </div>
                        <div className="rightbar-item-friend-name">
                            <b>{friend?.username}</b>
                        </div>
                    </div>
                    <div className="rightbar-item-infoFriend">
                        <div className="rightbar-item-image">
                            <img src={friend?.avatar || (PF + "noAvatar.png") } alt="Hình ảnh" />
                        </div>
                        <div className="rightbar-item-info">
                            <b>{friend?.username}</b>
                            <hr />
                            <span className="rightbar-item-info-span1"><i className="fas fa-user-friends"></i> Tham gia từ <b>{format(friend?.createdAt)}</b></span>
                            <span className="rightbar-item-info-span2"><i className="fas fa-map-marked-alt"></i> Đến từ <b>{friend?.hometown}</b></span>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default FriendOnline;