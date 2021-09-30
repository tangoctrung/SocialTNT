import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Post.css";
import Picker from 'emoji-picker-react';
import Comment from "../Comment/Comment";
import axios from 'axios';
import { format } from "timeago.js";
import { Link } from 'react-router-dom';
import { Context } from 'context/Context';
import { useContext } from 'react';
import { useRef } from 'react';

function Post({post}) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    const [imageModal, setImageModal] = useState();
    const [avatarAuthor, setAvatarAuthor] = useState("");
    const [nameAuthor, setNameAuthor] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [isDisliked, setIsDisliked] = useState(false);
    const [totalLike, setTotalLike] = useState(post ? post.likes.length : 0);
    const [totalDislike, setTotalDislike] = useState(post ? post.dislikes.length : 0);
    const PF = "http://localhost:8800/images/";
    const { user, dispatch } = useContext(Context);
    const inputCommentRef = useRef();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
        const setLike = () => {
            setIsLiked(post ? post.likes.includes(user._id) : false);
            setIsDisliked(post ? post.dislikes.includes(user._id) : false);
            setIsSaved(user?.postSaved?.includes(post?._id));
        }
        setLike();

        return (()=> setLike());
    }, [user._id, post.likes, post.dislikes]);

    useEffect(() => {
        const fetchAuthorPost = async () => {
            const res = await axios.get(`/users/profile/${post.userId}`);
            setAvatarAuthor(res.data.avatar);
            setNameAuthor(res.data.username);
            const resComment = await axios.get(`/comment/post/${post._id}`);
            setComments(resComment.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
              }));
        }
        fetchAuthorPost();
        
        return(()=> fetchAuthorPost());
    }, [post && post])

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
            userId: user ? user._id : "",
            postId: post ? post._id : "",
            content: inputCommentRef.current.value,
        }
        
        let newComments = [...comments];
        newComments.unshift(dataComment);
        const comment1 = [...newComments];
        setComments(comment1); 
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
        <div className="post">
            <div className="post-infoAuthor">
                <Link to={`/profile/${post ? post.userId : ""}`} className="post-infoAuthor-avatar">
                    <img src={avatarAuthor ? (avatarAuthor) : (PF + "noAvatar.png")} alt="Avatar" />
                </Link>
                <div className="post-infoAuthor-nameAuthor">
                    <Link to={`/profile/${post ? post.userId : ""}`} style={{ textDecoration: "none", color: "black" }}><b>{nameAuthor}</b></Link>
                    <span title={post ? new Date(post.createdAt).toDateString() : ""} >{post ? format(post.createdAt) : ""}</span>
                </div>
                <div className="post-infoAuthor-menu">
                    <i className="fas fa-ellipsis-h"></i>
                    <div className="post-infoAuthor-menu-content">
                        {user._id === post.userId && <>
                            <span><i className="fas fa-pen"></i> Chỉnh sửa</span>
                            <span><i className="fas fa-trash"></i> Xóa bài viết</span>
                        </>}
                        {!isSaved && <span onClick={handleSaveOrUnSavePost}><i className="fas fa-bookmark"></i> Lưu bài viết</span>}
                        {isSaved && <span onClick={handleSaveOrUnSavePost}><i className="far fa-bookmark"></i> Bỏ lưu bài viết</span>}
                        <span><i className="fas fa-question-circle"></i> Báo cáo</span>
                    </div>
                </div>
            </div>
            
            <div className="post-textContent">
                <div className="post-textContent-body">
                    <h2>{post ? post.title : ""}</h2>
                    <span>{post ? post.body : ""}</span>
                </div>
                <hr />
                <div className="post-textContent-hashtag">
                    { post &&
                        post.hashtags.map((hashtag, index) => <Link to={`/postcondition?hashtag=${hashtag}`} key={index} href="">#{hashtag}</Link>)
                    }         
                </div>
            </div>
            
            <div className="post-listImage">
                <Slider {...settings} className="post-listImage-slide">
                    {post && post.images.map((image, index) => <div className="post-listImage-slide-item" key={index} onClick={()=> {setIsOpenModal(true); setImageModal(image)}}>
                                                            <img src={image} />
                                                       </div>)}
                    
                </Slider>
            </div>
            
            <div className="post-like-dislike-comments">
                <div className="post-common post-like" onClick={handleLikePost}>
                    <span style={{color: isLiked ? "red" : ""}} >{totalLike}</span>
                    <i className={isLiked ? "fas fa-heart" : "far fa-heart"} style={{color: isLiked ? "red" : ""}} title="Yêu thích"></i>
                </div>
                <div className="post-common post-dislike" onClick={handleDislikePost}>
                    <span>{totalDislike}</span>
                    <i className={isDisliked ? "fas fa-heart-broken" : "far fa-heart-broken"} style={{color: isDisliked ? "black" : ""}} title="Thất vọng"></i>
                </div>
                <div className="post-common post-comments">
                    <span>{comments ? comments.length : ""}</span>
                    <i className="far fa-comment" title="Bình luận"></i>
                </div>
            </div>
            
            <form className="post-writeComment" onSubmit={handleSubmitComment}>
                <div className="post-writeComment-avatar">
                    <img src={user.avatar ? (user.avatar) : (PF + "noAvatar.png")} alt="Avatar" />
                </div>
                <div className="post-writeComment-input">
                    <input ref={inputCommentRef} type="text" placeholder="Hãy bình luận về bài viết này..." onFocus={()=> setIsOpenEmoji(false)} />
                </div>
                <div className="post-writeComment-emoji">
                    <i className="far fa-grin" onClick={()=> setIsOpenEmoji(!isOpenEmoji)}></i>
                    {isOpenEmoji && <div className="post-writeComment-picker">
                        <Picker onEmojiClick={onEmojiClick} />
                    </div>}
                </div>
            </form>
            
            <div className="post-listComment">      
                {comments && comments.map( (comment, index) => (
                    <Comment key={index} comment={comment} />                  
                ))}        
              
            </div>
            
            {isOpenModal && <div className="post-modal">                                                    
                                <div className="post-modal-Image">
                                    <img src={imageModal} />
                                    <div className="post-modal-close" onClick={()=> setIsOpenModal(false)}>
                                        <i className="far fa-times-circle"></i>
                                    </div>
                                </div>      
                            </div>
                }
        </div>
    );
}

export default Post;