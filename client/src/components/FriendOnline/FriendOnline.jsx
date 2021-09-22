import React from 'react';
import "./FriendOnline.css";

function FriendOnline({Avatar, Name, FriendTo, From}) {
    return (
        <div>
            <div className="rightbar-item">
                    <div className="rightbar-item-friend">
                        <div className="rightbar-item-friend-image">
                            <img src={Avatar} alt="Hình ảnh" />
                            <i className="fas fa-circle"></i>
                        </div>
                        <div className="rightbar-item-friend-name">
                            <b>{Name}</b>
                        </div>
                    </div>
                    <div className="rightbar-item-infoFriend">
                        <div className="rightbar-item-image">
                            <img src={Avatar} alt="Hình ảnh" />
                        </div>
                        <div className="rightbar-item-info">
                            <b>{Name}</b>
                            <hr />
                            <span className="rightbar-item-info-span1"><i className="fas fa-user-friends"></i> Bạn bè từ <b>{FriendTo}</b> năm trước</span>
                            <span className="rightbar-item-info-span2"><i className="fas fa-map-marked-alt"></i> Đến từ <b>{From}</b></span>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default FriendOnline;