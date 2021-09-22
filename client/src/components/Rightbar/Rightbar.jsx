import React, { useState } from 'react';
import "./Rightbar.css";
import Avatar from "../../image/avatar.jpg";
import Avatar1 from "../../image/avatar1.jpg";
import Avatar2 from "../../image/avatar2.jpg";
import Avatar3 from "../../image/avatar3.jpg";
import Avatar4 from "../../image/avatar4.jpg";
import FriendOnline from '../FriendOnline/FriendOnline';

function Rightbar() {
    const [isShowInputFindFriend, setIsShowInputFindFriend] = useState(false);
    const handleClickSearchFriend = () => {
        setIsShowInputFindFriend(true);
    }
    const handleCloseSearchFriend = () => {
        setIsShowInputFindFriend(false);
    }
    return (
        <div className="rightbar">
            <form className="rightbar-form-find">
                {!isShowInputFindFriend && <>
                    <span>Bạn bè đang hoạt động</span>
                    <i className="fas fa-search" title="Tìm kiếm bạn bè để nhắn tin" onClick={handleClickSearchFriend}></i>
                </>}
                
                {isShowInputFindFriend && <div className="form-input">
                                            <input placeholder="Tìm kiếm bạn bè để nhắn tin" />
                                            <i className="fal fa-times" onClick={handleCloseSearchFriend}></i>
                                          </div>}
                
            </form>
            <div className="rightbar-listFriendOnline">
                <FriendOnline Avatar={Avatar} Name={"Tạ Ngọc Trung"} FriendTo={1} From={"Kim Bảng, Hà Nam"}/>
                <FriendOnline Avatar={Avatar1} Name={"Anna Trần"} FriendTo={2} From={"Cầu Giấy, Hà Nội"}/>
                <FriendOnline Avatar={Avatar2} Name={"Kevin Nguyễn"} FriendTo={4} From={"Tuyên Quang"}/>
                <FriendOnline Avatar={Avatar3} Name={"Trần Công Thành"} FriendTo={1} From={"Thành phố Hồ Chí Minh"}/>
                <FriendOnline Avatar={Avatar4} Name={"John Smith"} FriendTo={3} From={"New York, America"}/> 
                <FriendOnline Avatar={Avatar} Name={"Tạ Ngọc Trung"} FriendTo={1} From={"Kim Bảng, Hà Nam"}/>
                <FriendOnline Avatar={Avatar1} Name={"Anna Trần"} FriendTo={2} From={"Cầu Giấy, Hà Nội"}/>
                <FriendOnline Avatar={Avatar2} Name={"Kevin Nguyễn"} FriendTo={4} From={"Tuyên Quang"}/>
                <FriendOnline Avatar={Avatar3} Name={"Trần Công Thành"} FriendTo={1} From={"Thành phố Hồ Chí Minh"}/>
                <FriendOnline Avatar={Avatar4} Name={"John Smith"} FriendTo={3} From={"New York, America"}/> 
                <FriendOnline Avatar={Avatar} Name={"Tạ Ngọc Trung"} FriendTo={1} From={"Kim Bảng, Hà Nam"}/>
                <FriendOnline Avatar={Avatar1} Name={"Anna Trần"} FriendTo={2} From={"Cầu Giấy, Hà Nội"}/>
                <FriendOnline Avatar={Avatar2} Name={"Kevin Nguyễn"} FriendTo={4} From={"Tuyên Quang"}/>
                <FriendOnline Avatar={Avatar3} Name={"Trần Công Thành"} FriendTo={1} From={"Thành phố Hồ Chí Minh"}/>
                <FriendOnline Avatar={Avatar4} Name={"John Smith"} FriendTo={3} From={"New York, America"}/>  
            </div>
        </div>
    );
}

export default Rightbar;