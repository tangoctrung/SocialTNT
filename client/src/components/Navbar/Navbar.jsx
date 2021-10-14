import React, { useContext, useRef, useState } from 'react';
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Context } from 'context/Context';
import axios from 'axios';
import { format } from "timeago.js";
import ReactTooltip from 'react-tooltip';

// hàm đảo ngược mảng
function reserveArr (arr) {
    let arr1 = [...arr];
    arr1.reverse();
    return arr1;
}

function Navbar() {
    const [isSearch, setIsSearch] = useState(false);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const { user, dispatch, isFetching } = useContext(Context);
    const inputRef = useRef();
    const [searchs, setSearchs] = useState(user ? reserveArr(user.searchHistorys) : []);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    console.log();
    
    const handleClickLogout = () => {
        dispatch({type: "LOGOUT"});
    }
    
    // MỞ Ô TÌM KIẾM
    const handleClickOpenFind = () => {
        setIsSearch(true);
        inputRef.current.focus();
    }
    // TẮT Ô TÌM KIẾM
    const handleClickCloseFind = () => {
        setIsSearch(false);
        inputRef.current.value = "";
    }
    const handleChangeFind = (e) => {
        
    }
    const handleSubmitFind =  (e) => {
        e.preventDefault();
        dispatch({ type: "SEARCH_START"});
        const fetchDataUserPost = async () => {
            const resUser = await axios.get(`/users?username=${inputRef.current.value}`);
            setUsers(resUser.data);
            const resPost = await axios.get(`/posts?hashtag=${inputRef.current.value}`);
            setPosts(resPost.data);
            await axios.put("/users/addSearchHistory", {
                userId: user._id,
                history: inputRef.current.value
            });
            const s = inputRef.current.value;
            let historys = [...searchs];
            if (!historys.includes(s)){
                historys.unshift(s);
                dispatch({ type: "SEARCH_HISTORY", payload: s });
            }
            setSearchs(historys);
            dispatch({ type: "SEARCH_SUCCESS"});
        }
        fetchDataUserPost();
    }

    // KHI NGƯỜI DÙNG CLICK VÀO LỊCH SỬ TÌM KIẾM
    const handleClickHistory = (history) => {
        inputRef.current.value = history;
        inputRef.current.focus();
    }

    //KHI NGƯỜI DÙNG XÓA 1 LỊCH SỬ TÌM KIẾM
    const handleDeleteHistory = (history) => {
        let newHistory = [...searchs];
        const nh = newHistory.filter(h => h !== history);
        setSearchs(nh);
        dispatch({ type: "DELETE_HISTORY", payload: history });
        const fetchDeleteHistory = async () => {
            await axios.put("/users/deleteSearchHistory", {
                userId: user._id,
                history: history,
            })
        }
        fetchDeleteHistory();
    }
    return (
        <>
            <div className="navbar">

                <div className="navbar-left">
                    <h2>SocialTNT</h2>
                </div>

                <div className="navbar-center">
                    {user && <>
                                <Link to="/" className="navbar-center-home">
                                    <><i className="fas fa-home" data-tip="Trang chủ"></i><ReactTooltip place="bottom" type="dark" effect="solid"/></>
                                </Link>
                                <div className="navbar-center-find">
                                    {!isSearch && <><i className="fas fa-search" data-tip="Tìm kiếm" onClick={handleClickOpenFind}></i> <ReactTooltip place="bottom" type="dark" effect="solid"/></>}
                                    {isSearch && <><i class="fas fa-times" data-tip="Tắt tìm kiếm" onClick={handleClickCloseFind}></i><ReactTooltip place="left" type="dark" effect="solid"/></>}
                                    <form className="navbar-center-form" style={{width: isSearch ? "350px" : "30px"}} onSubmit={handleSubmitFind}>
                                        <input ref={inputRef} onChange={handleChangeFind} placeholder="Tìm kiếm người dùng hoặc bài viết theo hashtag"/>
                                    </form>
                                </div>
                                <Link to={`/profile/${user._id}`} className="navbar-center-noti">
                                    <><i className="fas fa-user-plus" data-tip="Trang cá nhân"></i><ReactTooltip place="bottom" type="dark" effect="solid"/></>
                                </Link>
                            </>}
                    
                </div>

                <div className="navbar-right">
                    {user && <>                               
                                <div className="navbar-right-profile">
                                    <div className="navbar-right-img">
                                        <img src={user.avatar ? (user.avatar) : (PF + "noAvatar.png")} alt="image" />
                                        <div className="navbar-right-list">
                                            <div className="navbar-right-item">
                                                <i className="fas fa-cog"></i>
                                                <span>Cài đặt</span>
                                            </div>
                                            <div className="navbar-right-item">
                                                <Link to="/postSaved" style={{textDecoration: "none", color: 'black'}}>
                                                    <i className="fas fa-save"></i>
                                                    <span>Đã lưu</span>
                                                </Link>
                                            </div>
                                            {/* <Link to="/postSaved" style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-bookmark"></i>
                    <span>Đã lưu</span>
                </Link> */}
                                            <div className="navbar-right-item" onClick={handleClickLogout}>
                                                <i className="fas fa-sign-out-alt"></i>
                                                <span>Đăng xuất</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>              
                            </>}
                    {!user && <>
                            <div className="navbar-Login-register">
                                <Link to="/login" className="navbar-login">
                                    <span>Đăng nhập</span>
                                </Link>
                                <Link to="/register" className="navbar-register">
                                    <span>Đăng kí</span>
                                </Link>
                            </div>
                    </>}
                </div>

            </div>
            
            {isSearch && <div className="find-UserPost">
                <div className="find-modal"></div>
                <div className="find-content">
                    <div className="find-content-history">
                        <p>Lịch sử tìm kiếm</p>
                        <div className="find-content-history-container">
                            {searchs.length > 0 && searchs.map( (history) => (
                                <div className="find-content-history-container-item" onClick={() => handleClickHistory(history)}>
                                    <div className="find-history-container-item-info">
                                        <p>{history}</p>
                                    </div>                             
                                    <div className="find-history-container-item-close" onClick={()=> handleDeleteHistory(history)}>
                                        <i className="fal fa-times" title="Xóa tìm kiếm"></i>
                                    </div>
                                </div>     
                            ))}
                        </div>
                    </div>
                    <div className="find-content-user">
                        <p>Người dùng được tìm thấy</p>
                        <div className="find-content-user-container">
                            {isFetching && <div className="find-content-user-container-item"> <div className="spinner-3"></div><p>Đang tìm kiếm</p></div>}
                            {users.length === 0 && !isFetching && <div className="find-content-user-container-item-noFind"> <p>Không có</p></div>}                
                            {users && !isFetching && users.map(user => (
                                <div onClick={() => setIsSearch(false)}>
                                    <Link to={`/profile/${user ? user._id : ""}`} style={{textDecoration: "none", color: "black"}} className="find-content-user-container-item">
                                        <div className="find-user-container-item-img">
                                            <img src={user.avatar ? (user.avatar) : (PF + "noAvatar.png")} alt="image" />
                                        </div>
                                        <div className="find-user-container-item-info">
                                            <strong>{user ? user.username : ""}</strong>
                                            <span>Tham gia từ <b>{user ? format(user.createdAt) : ""}</b> trước</span>
                                        </div>
                                        <div className="find-user-container-item-close">
                                            <i className="fal fa-long-arrow-right" title="Đi đến trang cá nhân"></i>
                                        </div>
                                    </Link> 
                                </div>
                            ))}
                                                                                                                                                       
                        </div>
                    </div>
                    <div className="find-content-post">
                    <p>Bài viết được tìm thấy</p>
                        <div className="find-content-post-container">
                            {isFetching && <div className="find-content-post-container-item"><div className="spinner-3"></div><p>Đang tìm kiếm</p></div>}
                            {posts.length === 0 && !isFetching && <div className="find-content-post-container-item-noFind"> <p>Không có</p></div>}
                            {posts && !isFetching && posts.map(post => (
                                <div onClick={() => setIsSearch(false)}>
                                    <Link to={post ? `/post/${post._id}?userId=${post.userId}` : ""}  style={{textDecoration: "none", color: "black"}}  className="find-content-post-container-item">
                                        <div className="find-post-container-item-img">
                                            <img src={post ? (post.images[0]) : (PF + "noAvatar.png")} alt="image" />
                                        </div>
                                        <div className="find-post-container-item-info">
                                            <strong>{post ? post.title : ""}</strong>
                                            {post && <span>{post.body.length > 125 ? post.body.slice(0, 125) + "...Đọc thêm" : post.body}</span>}
                                            <p>{post ? format(post.createdAt) : ""}</p>
                                        </div>
                                        <div className="find-post-container-item-close">
                                            <i className="fal fa-long-arrow-right" title="Đi đến bài viết"></i>
                                        </div>
                                    </Link>   
                                </div> 
                            ))}          
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Navbar;