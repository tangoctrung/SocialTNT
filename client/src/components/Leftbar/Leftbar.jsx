import React, { useContext } from 'react';
import "./Leftbar.css";
import { Context } from 'context/Context';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

function Leftbar() {
    const PF = "http://localhost:8800/images/";
    const { user} = useContext(Context);
    return (
        <div className="leftbar">
            <Link to={`/profile/${user._id}`} style={{textDecoration: "none"}} className="leftbar-item image">
                <img src={user.avatar ? (user.avatar) : (PF + "noAvatar.png")} />
                <span>{user.username}</span>
            </Link>
            <div className="leftbar-top">
                <Link to="/" style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-home"></i>
                    <span>Trang chủ</span>
                </Link>
                <Link to="/" style={{textDecoration: "none"}} className="leftbar-item">
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
                <div className="leftbar-item">
                    <i className="fas fa-book"></i>
                    <span>Bài viết hot</span>
                </div>
                <Link to="/postSaved" style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-bookmark"></i>
                    <span>Đã lưu</span>
                </Link>
        
            </div>
            <div className="leftbar-bottom">
                <p>Những chủ đề bài viết mà bạn quan tâm</p>
                <div className="leftbar-item">
                    <i className="fas fa-globe-americas"></i>
                    <span>Thế giới</span>
                </div>
                <div className="leftbar-item">
                    <i className="fas fa-user-astronaut"></i>
                    <span>Khoa học, Công nghệ</span>
                </div>
                <div className="leftbar-item">
                    <i className="fas fa-school"></i>
                    <span>Giáo dục</span>
                </div>
                <div className="leftbar-item">
                    <i className="fas fa-skiing-nordic"></i>
                    <span>Văn hóa</span>
                </div>
                <div className="leftbar-item">
                    <i className="fas fa-hospital-user"></i>
                    <span>Y tế</span>
                </div>
                <div className="leftbar-item">
                    <i className="fas fa-person-booth"></i>
                    <span>Giải trí</span>
                </div>
                <div className="leftbar-item">
                    <i className="fas fa-plane-departure"></i>
                    <span>Du lịch</span>
                </div>
                <div className="leftbar-item">
                    <i className="fas fa-hands-heart"></i>
                    <span>Sức khỏe</span>
                </div>
                <div className="leftbar-item">
                    <i className="fas fa-futbol"></i>
                    <span>Thể thao</span>
                </div>
            </div>
            <div className="leftbar-text">
                <span>SocialTNT@2021. Đã đăng kí bản quyền.</span>
            </div>
            
            
        </div>
    );
}

export default Leftbar;