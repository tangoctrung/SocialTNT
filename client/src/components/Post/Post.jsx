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
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ModalEditPost from 'components/ModalEditPost/ModalEditPost';

function Post({post}) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    const [imageModal, setImageModal] = useState();
    const [changeComment, setChangeComment] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [isDisliked, setIsDisliked] = useState(false);
    const [totalLike, setTotalLike] = useState();
    const [totalDislike, setTotalDislike] = useState();
    const [isOpenModalEditPost, setIsOpenModalEditPost] = useState(false);
    const [isDeletePost, setIsDeletePost] = useState(false);
    const PF = "http://localhost:8800/images/";
    const { user, dispatch, socket } = useContext(Context);
    const inputCommentRef = useRef();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    useEffect(() => {
        socket?.on('createCommentToClient', (newComment) => {
            if (newComment.writerId?._id !== user?.id) {
                let comment = [...comments, newComment];
                setComments(comment);
            }
        })
    }, [comments]);
    useEffect(() => {
        socket?.on("likePostToClient", ({likes, dislikes, postId}) => {
            if (postId === post?._id) {
                setTotalLike(likes);
                setTotalDislike(dislikes);          
            }
        })
        socket?.on("cancleLikePostToClient", ({postId}) => {      
            if (postId === post?._id) {
                let likes = totalLike;
                likes = likes - 1;
                setTotalLike(likes);
            }   
        })
    }, [totalLike]);
    useEffect(() => {
        socket?.on("disLikePostToClient", ({likes, dislikes, postId}) => {
            if (postId === post?._id) {
                setTotalDislike(dislikes);           
                setTotalLike(likes);
            }
            
        })
        socket?.on("cancleDislikePostToClient", ({postId}) => {   
            if (postId === post?._id) {
                let disLikes = totalDislike;
                disLikes = disLikes - 1;
                setTotalDislike(disLikes);
            }        
        })
    }, [totalDislike]);

    useEffect(() => {
        const setLike = () => {
            setTotalLike(post?.likes?.length);
            setTotalDislike(post?.dislikes?.length);
            setIsLiked(post?.likes?.includes(user._id));
            setIsDisliked(post?.dislikes?.includes(user._id));
            setIsSaved(user?.postSaved?.includes(post?._id));
        }
        setLike();

        return (()=> setLike());
    }, [user._id, post?.likes, post?.dislikes]);

    useEffect(() => {
        const fetchAuthorPost = async () => {
            const resComment = await axios.get(`/comment/post/${post?._id}`);           
            setComments(resComment.data);
        }
        fetchAuthorPost();
        
        return(()=> fetchAuthorPost());
    }, [post?._id, changeComment])

    // LIKE POST
    const handleLikePost = async () => {
        if (isLiked) {
            setIsLiked(false);
            let likes = totalLike - 1; setTotalLike(likes); 
            socket?.emit('cancleLikePost', {postId: post?._id});    
            
        } else {
            setIsLiked(true);
            let likes = totalLike + 1; setTotalLike(likes);     
                  
            if (isDisliked){
                setIsDisliked(false);
                let dislikes = totalDislike - 1; setTotalDislike(dislikes);
                await axios.put(`/posts/post/${post ? post._id : ""}/dislike`, {
                    userId: user ? user._id : ""
                });
                socket?.emit('likePost', {
                    likes: totalLike + 1,
                    dislikes: totalDislike - 1,
                    postId: post?._id,
                }); 
            } else {
                socket?.emit('likePost', {
                    likes: totalLike + 1,
                    dislikes: totalDislike,
                    postId: post?._id,
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
            socket?.emit('cancleDislikePost', {postId: post?._id});    
        } else {
            setIsDisliked(true);
            let dislikes = totalDislike + 1; setTotalDislike(dislikes);
               
            if (isLiked) {
                setIsLiked(false);
                let likes = totalLike - 1; setTotalLike(likes);
                await axios.put(`/posts/post/${post ? post._id : ""}/like`, {
                    userId: user ? user._id : ""
                });
                socket?.emit('disLikePost', {
                    likes: totalLike - 1,
                    dislikes: totalDislike + 1,
                    postId: post?._id,
                }); 
            } else {
                socket?.emit('disLikePost', {
                    likes: totalLike,
                    dislikes: totalDislike + 1,
                    postId: post?._id,
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
        let dataComment_Post = {
            writerId:  user ? user._id : "",             
            postId: post ? post._id : "",
            content: inputCommentRef.current.value,
        }
        try{
            await axios.post(`/comment/`, dataComment_Post);
            setChangeComment(!changeComment);
            const newComment = {
                writerId:  {
                    _id: user?._id,
                    username: user?.username,
                    avatar: user?.avatar,
                },             
                postId: post?._id,
                content: inputCommentRef.current.value,
            }
            socket?.emit('createComment', newComment);
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

    // DELETE POST
    const handleDeletePost = async () => {
        await axios.delete(`/posts/${post?._id}`);
        window.location.reload();
    }

    return (
        <div className="post">
            <div className="post-infoAuthor">
                <Link to={`/profile/${post ? post.authorId._id : ""}`} className="post-infoAuthor-avatar">
                    <img src={post?.authorId.avatar ? (post?.authorId.avatar) : (PF + "noAvatar.png")} alt="Avatar" />
                </Link>
                <div className="post-infoAuthor-nameAuthor">
                    <Link to={`/profile/${post ? post?.authorId._id : ""}`} style={{ textDecoration: "none", color: "black" }}><b>{post?.authorId.username}</b></Link>
                    <span title={post ? new Date(post?.createdAt).toDateString() : ""} >{post ? format(post?.createdAt) : ""}</span>
                </div>
                <div className="post-infoAuthor-menu">
                    <i className="fas fa-ellipsis-h"></i>
                    <div className="post-infoAuthor-menu-content">
                        {user._id === post?.authorId._id && <>
                            <span onClick={() => setIsOpenModalEditPost(true)} ><i className="fas fa-pen"></i> Chỉnh sửa</span>
                            <span onClick={() => setIsDeletePost(true)} ><i className="fas fa-trash"></i> Xóa bài viết</span>
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
                {post?.hashtags.length !== 0 && post?.hashtags[0] !== "" && 
                    <>
                        <hr />
                        <div className="post-textContent-hashtag">
                            { post &&
                                post.hashtags.map((hashtag, index) => <Link to={`/postcondition?hashtag=${hashtag}`} key={index} href="">#{hashtag}</Link>)
                            }         
                        </div> 
                    </>
                }
            </div>
            
            {post?.images?.length > 0 && <div className="post-listImage">
                <Slider {...settings} className="post-listImage-slide">
                    {post && post.images.map((image, index) => <div className="post-listImage-slide-item" key={index} onClick={()=> {setIsOpenModal(true); setImageModal(image)}}>
                                                            <img src={image} />
                                                       </div>)}
                    
                </Slider>
            </div>}
            
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
                {comments.length>0 && comments.map( (comment, index) => (
                    <Comment key={index} comment={comment} />                  
                ))}        
              
            </div>
            
            {isOpenModal && <div className="post-modal">                                                    
                                <div className="post-modal-content" onClick={()=> setIsOpenModal(false)}></div>
                                <div className="post-modal-Image">
                                    <TransformWrapper style={{width: '100%', height: '100%'}}>
                                        <TransformComponent style={{width: '100%', height: '100%'}}>
                                            <img src={imageModal} />
                                        </TransformComponent>
                                    </TransformWrapper>
                                    <div className="post-modal-close" onClick={()=> setIsOpenModal(false)}>
                                        <i className="fas fa-times-circle"></i>
                                    </div>
                                </div>      
                            </div>
                }
            {isOpenModalEditPost && <div className="post-modal-edit"> 
                <div className="post-modal-edit-container">
                    <div className="post-modal-edit-close" onClick={() => setIsOpenModalEditPost(false)}>
                        <i className="fas fa-times" ></i>
                    </div>
                    <ModalEditPost post={post} />
                </div>
            </div>}
            
            {isDeletePost && <div className="post-modal-deletePost">
                                <div className="post-modal-content" onClick={()=> setIsDeletePost(false)}></div>
                                <div className="post-modal-deletePost-info">
                                    <p>Bạn có muốn xóa bài viết này không?</p>
                                    <div className="list-button">
                                        <button onClick={handleDeletePost}>Xóa</button>
                                        <button onClick={()=> setIsDeletePost(false)}>Không</button>
                                    </div>
                                </div>
                            </div>
            }
        </div>
    );
}

export default Post;