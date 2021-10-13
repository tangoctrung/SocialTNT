import React, { useEffect} from 'react';
import "./PostDetail.css";
import { useLocation } from 'react-router';
import axios from 'axios';
import { useState } from 'react';
import Post from 'components/Post/Post';
import { Context } from 'context/Context';
import { useContext } from 'react';
import NotificationFast from 'components/NotificationFast/NotificationFast';

function PostDetail() {
    const location = useLocation();
    const postId = location.pathname.split("/")[2];
    const [post, setPost] = useState();
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
        const FetchAuthorPost = async () => {

            // API GET POST
            const resPost = await axios.get(`/posts/post/${postId}`);
            setPost(resPost.data);        
        }
        if (postId !== "undefined") {
            FetchAuthorPost();
        }
    }, [postId]);


    return (
        <>
            <div className="post-detail">
                {postId !== "undefined" ? 
                    <div className="postdetail">
                        <Post post={post} />
                    </div>
                : 
                    <div className="post-detail-notFound"><p>Bài viết này không tồn tại</p></div>
                }
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
}

export default PostDetail;