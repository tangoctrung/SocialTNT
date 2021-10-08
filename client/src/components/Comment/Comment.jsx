import React from "react";
import "./Comment.css";
import { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "context/Context";
import { useContext } from "react";
import Picker from "emoji-picker-react";
import { useRef } from "react";
import ReplyComment from "components/ReplyComment/ReplyComment";

function Comment({ comment }) {
  const { user, socket } = useContext(Context);
  const [isOpenReplyComment, setIsOpenReplyComment] = useState(false);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [isLikeComment, setIsLikeComment] = useState(false);
  const [totalLikeComment, setTotalLikeComment] = useState(0);
  const [replyComments, setReplyComments] = useState([]);
  const [nameComment, setNameComment] = useState("");
  const inputCommentRef = useRef();
  const [nameReply, setNameReply] = useState("");
  const [contentComment, setContentComment] = useState(comment?.content);
  const PF = "http://localhost:8800/images/";
  const commentRef = useRef();
  const inputEditComment = useRef();
  const [isEditComment, setIsEditComment] = useState(false);
  const [isDeleteComment, setIsDeleteComment] = useState(false);
  const [changeReplyComment, setChangeReplyComment] = useState(false);

  useEffect(() => {
    socket?.on('createCommentToClient', (newComment) => {
        if (newComment.userId?._id !== user?.id && newComment.commentId === comment?._id) {
            let comment = [...replyComments, newComment];
            setReplyComments(comment);
        }
    })
  }, [replyComments]);

  useEffect(() => {
    socket?.on('LikeCommentToClient', ({commentId, likesComment}) => {
      if (commentId === comment?._id) {
        setTotalLikeComment(likesComment);
      }
    });
    socket?.on('cancleLikeCommentToClient', ({commentId, likesComment}) => {
      if (commentId === comment?._id) {
        setTotalLikeComment(likesComment);
      }
    });
  }, [totalLikeComment]);

  useEffect(() => {
    const fetchReplyComment = async () => {
      const resReplyComment = await axios.get(`/replycomment/comment/${comment?._id}`);
      setReplyComments(resReplyComment.data);
  }
  fetchReplyComment();
  }, [changeReplyComment]);


  useEffect(() => {
    setNameComment(comment?.writerId?.username);
    setIsLikeComment(comment?.likes?.includes(user?._id));
    setTotalLikeComment(comment?.likes?.length);
    
  }, [])

  // LIKE/UNLIKE COMMENT
  const handleLikedComment = () => {
      const fetchLikedComment = async () => {
        await axios.put(`/comment/likecomment`, {
          commentId: comment?._id,
          userId: user?._id,
        });
      };
      fetchLikedComment();
      if (isLikeComment) {
        socket?.emit('cancleLikeComment', {
          commentId: comment?._id, 
          likesComment: totalLikeComment - 1,
        });
      } else {
        socket?.emit('likeComment', {
          commentId: comment?._id, 
          likesComment: totalLikeComment + 1,
        });
      }
      setTotalLikeComment(
        !isLikeComment ? totalLikeComment + 1 : totalLikeComment - 1
      );
      setIsLikeComment(!isLikeComment);
  };

  // CLICK CHOOSE EMOJI
  const onEmojiClick = (event, data) => {
    inputCommentRef.current.value += data.emoji;
  };

  // KHI NGƯỜI DÙNG ẤN NÚT TRẢ LỜI
  const handleClickReply = (nameComment) => {
    
    setIsOpenReplyComment(!isOpenReplyComment);
    setNameReply(nameComment + ": ");
    
  };

  // REPLY COMMENT
  const handleSubmitReplyComment = (e) => {
    e.preventDefault();
    const dataReply = {
        content: nameReply,
        userId: user?._id,
        commentId: comment?._id,
    }
    const fetchSubmitReplyComment = async () => {
        await axios.post(`/replycomment/`, dataReply);
        const newComment = {
          userId:  {
              _id: user?._id,
              username: user?.username,
              avatar: user?.avatar,
          },             
          commentId: comment?._id,
          content: nameReply,
        }
        socket?.emit('createComment', newComment);
        setChangeReplyComment(!changeReplyComment);
    }
    fetchSubmitReplyComment();
    setNameReply("");
    
  };

  // SUBMIT EDIT COMMENT
  const handleSubmitEditComment = async (e) => {
    e.preventDefault();
    const dataComment = {
      content: contentComment,
    }
    try {
      await axios.put(`/comment/${comment?._id}`, dataComment);
      setIsEditComment(false);
    } catch (err) {
      console.log(err);
    }
  }

  // DELETE COMMENT
  const handleDeleteComment = async () => {
    const dataComment = {
      content: "d!e!l!e!t!e",
    }
    await axios.put(`/comment/${comment?._id}/delete`, dataComment);
    window.location.reload();
  }
  return (
     
      <div className="comment-container" >
        {contentComment !== "d!e!l!e!t!e" ?
          <div className="post-itemComment">

            <Link
              to={`/profile/${comment ? comment.writerId?._id : ""}`}
              className="post-itemComment-avatar"
            >
              <img
                src={comment ? comment.writerId?.avatar : PF + "noAvatar.png"}
                alt="Avatar"
              />
            </Link>
            
            {!isEditComment && <>
            <div className="post-itemComment-body">
              <div className="post-itemComment-body-top">
                <Link
                  to={`/profile/${comment ? comment.writerId?._id : ""}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <b>{comment ? comment.writerId?.username : ""}</b>
                </Link>
                <span>{contentComment}</span>
              </div>
              
              <div className="post-itemComment-body-bottom">
                <p onClick={() => handleClickReply(nameComment)}>Trả lời</p>
                <span>{format(comment.createdAt)}</span>
                <span className="countLike" onClick={handleLikedComment}>
                  {totalLikeComment}
                  {!isLikeComment ? (
                    <i className="far fa-heart"></i>
                  ) : (
                    <i className="fas fa-heart" style={{ color: "red" }}></i>
                  )}
                </span>
              </div>
              
            </div>
            <div className="post-itemComment-menu">
              <i className="fas fa-ellipsis-v"></i>
              <div className="post-itemComment-menu-content">
                {comment.writerId?._id === user._id && (
                  <>
                    <span onClick={() => setIsEditComment(true)}>Chỉnh sửa</span>
                    <span onClick={() => setIsDeleteComment(true)}>Xóa</span>
                  </>
                )}
                <span>Báo cáo</span>
              </div>
            </div>
            </>}

            {isEditComment &&          
                  <form className="form-EditComment">
                    <textarea 
                      ref={inputEditComment} 
                      value={contentComment} 
                      onChange={(e) => setContentComment(e.target.value)} 
                    ></textarea>
                    <button onClick={handleSubmitEditComment}>Update</button>
                    <button onClick={() => setIsEditComment(false)}>Cancel</button>
                  </form>      
            }
          </div>: 
          <div className="commentDelete">
          <img
              src={PF + "noAvatar.png"}
              alt="Avatar"
          />
          <span>Bình luận này đã bị xóa</span>       
        </div>
        }

        <div className="post-listReplyComment" ref={commentRef}>
            {replyComments && replyComments.map((replyComment, index) => (
              <div >
                <ReplyComment
                  key={index}
                  replyComment={replyComment}
                  isOpenReplyComment={isOpenReplyComment}
                  setIsOpenReplyComment={setIsOpenReplyComment}
                  handleClickReply = {handleClickReply}
                />

              </div>
            ))}
        </div>

        {isOpenReplyComment && (
          <form className="post-replyComment" onSubmit={handleSubmitReplyComment}>
            <div className="post-replyComment-avatar">
              <img
                src={user.avatar ? user.avatar : PF + "noAvatar.png"}
                alt="Avatar"
              />
            </div>
            <div className="post-replyComment-input">
              <input
                ref={inputCommentRef}
                type="text"
                value={nameReply}
                placeholder="Phản hồi của bạn..."
                onChange={(e) => setNameReply(e.target.value)}
                onFocus={() => setIsOpenEmoji(false)}
              />
            </div>
            <div className="post-replyComment-emoji">
              <i
                className="far fa-grin"
                onClick={() => setIsOpenEmoji(!isOpenEmoji)}
              ></i>
              {isOpenEmoji && (
                <div className="post-replyComment-picker">
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
          </form>
        )}

        {isDeleteComment && 
          <div className="post-modal-deletePost">
            <div className="post-modal-content" onClick={()=> setIsDeleteComment(false)}></div>
            <div className="post-modal-deletePost-info">
                <p>Bạn có muốn xóa bình luận này không?</p>
                <div className="list-button">
                    <button onClick={handleDeleteComment}>Xóa</button>
                    <button onClick={()=> setIsDeleteComment(false)}>Không</button>
                </div>
            </div>
          </div>
        }
        
      </div>
    
  );
}

export default Comment;
