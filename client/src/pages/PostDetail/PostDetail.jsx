import React, { useEffect, useState } from 'react';
import "./PostDetail.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from 'react-router';
import { format } from "timeago.js";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from 'context/Context';
import { useContext } from 'react';
import { useRef } from 'react';
import Comment from "../../components/Comment/Comment";
import Picker from 'emoji-picker-react';

function PostDetail() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    const [imageModal, setImageModal] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const { user, dispatch } = useContext(Context);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [totalLike, setTotalLike] = useState(0);
    const [totalDislike, setTotalDislike] = useState(0);
    const location = useLocation();
    const PF = "http://localhost:8800/images/";
    const [post, setPost] = useState();
    const [avatarAuthor, setAvatarAuthor] = useState("");
    const [nameAuthor, setNameAuthor] = useState("");
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const userId = location.search.split("=")[1];
    const postId = location.pathname.split("/")[2];
    const [comments, setComments] = useState([]);
    const inputCommentRef = useRef();
    // useEffect(() => {
        
    // }, []);

    useEffect(() => {
        const FetchAuthorPost = async () => {

            // API GET AUTHOR POST
            const res = await axios.get(`/users/profile/${userId}`);
            setAvatarAuthor(res.data.avatar);
            setNameAuthor(res.data.username);

            // API GET POST
            const resPost = await axios.get(`/posts/post/${postId}`);
            setPost(resPost.data);
            setTotalLike(resPost.data.likes && resPost.data.likes.length);
            setTotalDislike(resPost.data.dislikes && resPost.data.dislikes.length);
            setIsLiked(resPost.data.likes && resPost.data.likes.includes(user?._id));
            setIsDisliked(resPost.data.dislikes && resPost.data.dislikes.includes(user?._id));
            setIsSaved(user?.postSaved?.includes(postId));

            // API GET COMMENT
            const resComment = await axios.get(`/comment/post/${postId}`);
            setComments(resComment.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        }
        FetchAuthorPost();

        return (()=> FetchAuthorPost());
    }, [userId, postId]);

    // LIKE POST
    const handleLikePost = async () => {
        if (isLiked) {
            setIsLiked(false);
            let likes = totalLike - 1; setTotalLike(likes);      
        } else {
            setIsLiked(true);
            let likes = totalLike + 1; setTotalLike(likes);            
            if (isDisliked){
                setIsDisliked(false);
                let dislikes = totalDislike - 1; setTotalDislike(dislikes);
                await axios.put(`/posts/post/${post ? post._id : ""}/dislike`, {
                    userId: user ? user._id : ""
                });
            }
        }
        await axios.put(`/posts/post/${post ? post._id : ""}/like`, {
            userId: user ? user._id : ""
        });
    }

    // DISLIKE POST
    const handleDislikePost = async () => {
        if (isDisliked) {
            setIsDisliked(false);
            let dislikes = totalDislike - 1; setTotalDislike(dislikes);
            
        } else {
            setIsDisliked(true);
            let dislikes = totalDislike + 1; setTotalDislike(dislikes);
            if (isLiked) {
                setIsLiked(false);
                let likes = totalLike - 1; setTotalLike(likes);
                await axios.put(`/posts/post/${post ? post._id : ""}/like`, {
                    userId: user ? user._id : ""
                });
            }
        }
        await axios.put(`/posts/post/${post ? post._id : ""}/dislike`, {
            userId: user ? user._id : ""
        });
    }

    // CLICK CHOOSE EMOJI
    const onEmojiClick = (event, data) => {
        inputCommentRef.current.value += data.emoji;
    }

    // COMMENT POST
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        let dataComment = {
            userId: user._id,
            postId: postId,
            content: inputCommentRef.current.value,
        }
        let newComments = [...comments];
        newComments.unshift(dataComment);
        setComments(newComments);
        try{
            await axios.post(`/comment/`, dataComment);
        }catch(err){}

        inputCommentRef.current.value = "";
        inputCommentRef.current.focus();
    }

    // SAVE / UNSAVE POST
    const handleSaveOrUnSavePost = () => {
        const fetchPost = async () => {
            await axios.put(`/users/savepost`, {
                userId: user?._id,
                postId: post?._id
            });
            if (isSaved) {
                dispatch({ type: "UNSAVEPOST", payload: post?._id });
            } else {
                dispatch({ type: "SAVEPOST", payload: post?._id });
            }
        }
        fetchPost();
        setIsSaved(!isSaved);
    }


    return (
        <div className="post-detail">
            <div className="postdetail">
                <div className="postdetail-infoAuthor">
                    <Link to={`/profile/${post ? post.userId : ""}`} style={{textDecoration: "none", color: "black"}} className="postdetail-infoAuthor-avatar">
                        <img src={avatarAuthor ? (avatarAuthor) : (PF + "noAvatar.png")} alt="Avatar" />
                    </Link>
                    <div className="postdetail-infoAuthor-nameAuthor">
                        <Link 
                        to={`/profile/${post ? post.userId : ""}`} 
                        style={{textDecoration: "none", color: "black"}}
                        >
                            <b>{nameAuthor ? nameAuthor : ""}</b>
                        </Link>
                        <span>{post ? format(post.createdAt) : ""}</span>
                    </div>
                    <div className="postdetail-infoAuthor-menu">
                        <i className="fas fa-ellipsis-h"></i>
                        <div className="postdetail-infoAuthor-menu-content">
                            {post && user._id === post.userId && <>
                                <span><i className="fas fa-pen"></i> Chỉnh sửa</span>
                                <span><i className="fas fa-trash"></i> Xóa bài viết</span>
                            </>}
                            {!isSaved && <span onClick={handleSaveOrUnSavePost}><i className="fas fa-bookmark"></i> Lưu bài viết</span>}
                            {isSaved && <span onClick={handleSaveOrUnSavePost}><i className="far fa-bookmark"></i> Bỏ lưu bài viết</span>}
                            <span><i className="fas fa-question-circle"></i> Báo cáo</span>
                        </div>
                    </div>
                </div>
               
                <div className="postdetail-textContent">
                    <div className="postdetail-textContent-body">
                        <h2>{post ? post.title : ""}</h2>
                        <span>{post ? post.body : ""}</span>
                    </div>
                    <hr />
                    <div className="postdetail-textContent-hashtag">
                        { post &&
                            post.hashtags.map((hashtag) => <a href="">#{hashtag}</a>)
                        }
                    </div>
                </div>
               
                <div className="postdetail-listImage" >
                    <Slider {...settings} className="postdetail-listImage-slide">
                        {post && post.images.map((image, index) => <div className="postdetail-listImage-slide-item" key={index} onClick={()=> {setIsOpenModal(true); setImageModal(image)}}>
                                                                        <img src={image} />
                                                                   </div>)}
                    </Slider>
                </div>
               
                <div className="postdetail-like-dislike-comments">
                    <div className="postdetail-common post-like" onClick={handleLikePost}>
                        <span style={{color: isLiked ? "red" : ""}} >{totalLike}</span>
                        <i className={isLiked ? "fas fa-heart" : "far fa-heart"} style={{color: isLiked ? "red" : ""}} title="Yêu thích"></i>
                    </div>
                    <div className="postdetail-common post-dislike" onClick={handleDislikePost}>
                        <span>{totalDislike}</span>
                        <i className={isDisliked ? "fas fa-heart-broken" : "far fa-heart-broken"} style={{color: isDisliked ? "black" : ""}} title="Thất vọng"></i>
                    </div>
                    <div className="postdetail-common post-comments">
                        <span>{comments && comments.length}</span>
                        <i className="far fa-comment" title="Bình luận"></i>
                    </div>
                </div>
               
                <form className="postdetail-writeComment" onSubmit={handleSubmitComment}>
                    <div className="postdetail-writeComment-avatar">
                        <img src={user.avatar ? (user.avatar) : (PF + "noAvatar.png")} alt="Avatar" />
                    </div>
                    <div className="postdetail-writeComment-input">
                        <input ref={inputCommentRef} type="text" placeholder="Hãy bình luận về bài viết này..." onFocus={()=> setIsOpenEmoji(false)} />
                    </div>
                    <div className="postdetail-writeComment-emoji">
                        <i className="far fa-grin" onClick={()=> setIsOpenEmoji(!isOpenEmoji)}></i>
                        {isOpenEmoji && <div className="postdetail-writeComment-picker">
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>}
                    </div>
                </form>
               
                <div className="postdetail-listComment">              
                    {comments && comments.map(comment => (
                        <Comment comment={comment} />                  
                    ))}                 
                </div>
            </div>
            {isOpenModal && <div className="postdetail-modal">                                                    
                                <div className="postdetail-modal-Image">
                                    <img src={imageModal} />
                                    <div className="postdetail-modal-close" onClick={()=> setIsOpenModal(false)}>
                                        <i className="far fa-times-circle"></i>
                                    </div>
                                </div>      
                            </div>
                }
            
        </div>
    );
}

export default PostDetail;