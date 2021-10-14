import React, { useContext } from 'react';
import "./Leftbar.css";
import { Context } from 'context/Context';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import URL from 'config/config';

function Leftbar() {
    const PF = URL.urlNoAvatar;
    const { user} = useContext(Context);
    return (
        <div className="leftbar">
            <Link to={`/profile/${user._id}`} style={{textDecoration: "none"}} className="leftbar-item image">
                <img src={user.avatar ? (user.avatar) : (PF)} />
                <span>{user.username}</span>
            </Link>
            <div className="leftbar-top">
                <Link to="/" style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-home"></i>
                    <span>Trang chủ</span>
                </Link>
                <Link to="/notification" style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-bell"></i>
                    <span>Thông báo</span>
                </Link>
                <Link to="/alluser" style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-user-friends"></i>
                    <span>Người dùng</span>
                </Link>
                <Link to="/chat" style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-comments"></i>
                    <span>Tin nhắn</span>
                </Link>
                <Link to="/postSaved" style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-bookmark"></i>
                    <span>Đã lưu</span>
                </Link>
        
            </div>
            <div className="leftbar-bottom">
                <p>Những chủ đề bài viết mà bạn quan tâm</p>
                <Link to={`/postthemen?themen=Thế giới`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-globe-americas"></i>
                    <span>Thế giới</span>
                </Link>
                <Link to={`/postthemen?themen=Khoa học công nghệ`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-user-astronaut"></i>
                    <span>Khoa học, Công nghệ</span>
                </Link>
                <Link to={`/postthemen?themen=Giáo dục`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-school"></i>
                    <span>Giáo dục</span>
                </Link>
                <Link to={`/postthemen?themen=Văn hóa`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-skiing-nordic"></i>
                    <span>Văn hóa</span>
                </Link>
                <Link to={`/postthemen?themen=Y tế`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-hospital-user"></i>
                    <span>Y tế</span>
                </Link>
                <Link to={`/postthemen?themen=Giải trí`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-person-booth"></i>
                    <span>Giải trí</span>
                </Link>
                <Link to={`/postthemen?themen=Du lịch`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-plane-departure"></i>
                    <span>Du lịch</span>
                </Link>
                <Link to={`/postthemen?themen=Sức khỏe`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-hands-heart"></i>
                    <span>Sức khỏe</span>
                </Link>
                <Link to={`/postthemen?themen=Thể thao`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-futbol"></i>
                    <span>Thể thao</span>
                </Link>
            </div>
            <div className="leftbar-text">
                <span>SocialTNT@2021. Đã đăng kí bản quyền.</span>
            </div>
            
            
        </div>
    );
}

export default Leftbar;