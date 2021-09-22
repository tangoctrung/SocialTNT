import React from 'react'
import "./Comment.css";
import { useEffect } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from 'context/Context';
import { useContext } from 'react';

function Comment({comment}) {
    const [avatarComment, setAvatarComment] = useState("");
    const [nameComment, setNameComment] = useState("");
    const PF = "http://localhost:8800/images/";
    const { user } = useContext(Context);
    useEffect(() => {
        const fetchUserComment = async () => {
            const resComment = await axios.get(`/users/profile/${comment.userId}`);
            setAvatarComment(resComment.data.avatar);
            setNameComment(resComment.data.username);
        }
        fetchUserComment();

        return( () => fetchUserComment());

    }, [comment.userId])
    return (
        <div className="post-itemComment">                   
            <Link to={`/profile/${comment ? comment.userId : ""}`} className="post-itemComment-avatar">
                <img src={avatarComment ? (avatarComment) : (PF + "noAvatar.png")} alt="Avatar" />
            </Link>   
            <div className="post-itemComment-body">
                <div className="post-itemComment-body-top">
                    <Link to={`/profile/${comment ? comment.userId : ""}`} style={{textDecoration: "none", color: "black"}}><b>{nameComment ? nameComment : ""}</b></Link>
                    <span>{comment.content}</span>
                </div>
                <div className="post-itemComment-body-bottom">
                    <p>Trả lời</p>
                    <span>{format(comment.createdAt)}</span>
                    <span className="countLike">4 <i className="far fa-heart"></i></span>
                </div>
            </div> 
            <div className="post-itemComment-menu">
                <i className="fas fa-ellipsis-v"></i>
                <div className="post-itemComment-menu-content">
                    {comment.userId === user._id && <>
                        <span>Chỉnh sửa</span>
                        <span>Xóa</span>
                    </>}             
                    <span>Báo cáo</span>
                </div>
            </div>               
        </div>
    );
}

export default Comment;

