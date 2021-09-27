import React, { useState } from 'react';
import "./Rightbar.css";
import FriendOnline from '../FriendOnline/FriendOnline';
import ReactTooltip from 'react-tooltip';
import { useEffect } from 'react';
import { Context } from 'context/Context';
import { useContext } from 'react';

function Rightbar() {
    const { socket } = useContext(Context);
    const [listFriendOnline, setListFriendOnline] = useState([]);
    const [isShowInputFindFriend, setIsShowInputFindFriend] = useState(false);
    useEffect(() => {
        socket?.on("getUser", users => {
            setListFriendOnline(users);
        });
    }, [socket]);
    console.log(listFriendOnline);
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
                    <><i className="fas fa-search" data-tip="Tìm kiếm bạn bè để nhắn tin" onClick={handleClickSearchFriend}></i><ReactTooltip place="bottom" type="dark" effect="solid"/></>
                </>}
                
                {isShowInputFindFriend && <div className="form-input">
                                            <input placeholder="Tìm kiếm bạn bè để nhắn tin" />
                                            <i className="fal fa-times" onClick={handleCloseSearchFriend}></i>
                                          </div>}
                
            </form>
            <div className="rightbar-listFriendOnline">
                {listFriendOnline && listFriendOnline.map ((friendOnline, index) => (
                    <FriendOnline key={index} friendId={friendOnline.userId} />
                ))}
            </div>
        </div>
    );
}

export default Rightbar;