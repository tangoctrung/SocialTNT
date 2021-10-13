import axios from 'axios';
import Post from 'components/Post/Post';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import "./PostThemen.css";
import NotificationFast from 'components/NotificationFast/NotificationFast';
import dataThemes from '../../data/index';
import { useContext } from 'react';
import { Context } from 'context/Context';

function PostThemen() {
    const [posts, setPosts] = useState([]);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const themen = location.search.split("=")[1];
    const themeHot = dataThemes.slice(0,8);
    const themenNormal = dataThemes.slice(8);
    const { user, socket } = useContext(Context);
    const [isNotiCreatePost, setIsNotiCreatePost] = useState(false);
    const [listNoti, setListNoti] = useState([]);

    // thông báo createPost, likePost, commentPost
    useEffect(() => {
        socket?.on("createPostToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
        });
        socket?.on("likePostNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
        });
        socket?.on("commentPostNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
        })
        socket?.on("replyCommentPostNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
        })
        socket?.on("likeCommentNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
        })
    }, [])

    setTimeout(() => {
        if(isNotiCreatePost) {
            setIsNotiCreatePost(false);
        }
    }, 5000)

    const handleClickNotiFast = async (noti, index) => {
        const dataNoti = {
            userId: user?._id,
            notiId: noti?._id
        }
        await axios.put(`/notifications/updateNotification`, dataNoti);
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchPost = async () => {
            const res = await axios.get(`/posts/themen/?themen=${themen}`);
            // setPosts(res.data);
            setPosts(
                res.data.sort((p1, p2) => {
                  return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
              );
            setIsLoading(false);
        }
        fetchPost();
    }, [themen])
    return (
        <>
            <div className="PostThemen">
                <div className="PostThemen-left">
                    <div className="PostThemen-left-top">
                        <p>Bạn đang tìm kiếm <b>chủ đề</b></p>
                        <h2>{themen}</h2>
                    </div>
                    <div className="PostThemen-left-bottom">
                        <p>Những <b>chủ đề</b> đang hot</p>
                        <div className="PostThemen-left-bottom-container">
                            {themeHot && themeHot.map((themen, index) => (
                                <Link 
                                    key={index}
                                    to={`postthemen?themen=${themen.themen}`} 
                                    style={{textDecoration: 'none', color: 'black'}}
                                >
                                    <p>{themen.themen}</p>
                                </Link>
                            ))}
                            
                        </div>
                    </div>
                </div>
                <div className="PostThemen-center">
                    {!isLoading && posts.length > 0 && posts.map((post, index) => (
                        <Post post={post} post={post} key={index}/>
                    ))}
                    {posts.length === 0 && !isLoading &&  <span className="PostThemen-center-text">Không tìm thấy bài viết nào</span>}
                    {isLoading && <div className="PostThemen-center-loading"> <div className="spinner-2"></div><p>Đang tải...</p> </div>}
                </div>
                <div className="PostThemen-right">
                    <p>Những <b>chủ đề</b> có thể bạn quan tâm</p>
                    <div className="PostThemen-right-bottom-container">
                        {themenNormal && themenNormal.map((themen, index) => (
                            <Link 
                                key={index}
                                to={`postthemen?themen=${themen.themen}`} 
                                style={{textDecoration: 'none', color: 'black'}}
                            >
                                <p>{themen.themen}</p>
                            </Link>
                        ))}
                        
                    </div>
                </div>
            </div>

            {isNotiCreatePost && 
                <div className="homePage-noti">
                    {listNoti && listNoti.map( (noti, index) => (
                        <div key={index} onClick={() => handleClickNotiFast(noti, index)}>
                            <NotificationFast noti={noti} />
                        </div>
                    ))}
                </div>}
        </>
    );
};

export default PostThemen;
