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
  const { user } = useContext(Context);
  const [isOpenReplyComment, setIsOpenReplyComment] = useState(false);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [avatarComment, setAvatarComment] = useState("");
  const [isLikeComment, setIsLikeComment] = useState(
    comment.likes?.includes(user?._id)
  );
  const [totalLikeComment, setTotalLikeComment] = useState(
    comment?.likes?.length
  );
  const [replyComments, setReplyComments] = useState([]);
  const [nameComment, setNameComment] = useState("");
  const inputCommentRef = useRef();
  const [nameReply, setNameReply] = useState("");
  const PF = "http://localhost:8800/images/";

  useEffect(() => {
    const fetchUserComment = async () => {
      const resComment = await axios.get(`/users/profile/${comment.userId}`);
      setAvatarComment(resComment.data.avatar);
      setNameComment(resComment.data.username);
    };
    fetchUserComment();

    
    return () => fetchUserComment();
  }, [comment.userId]);

  useEffect(() => {
    const fetchReplyComment = async () => {
        const resReplyComment = await axios.get(`/replycomment/comment/${comment?._id}`);
        setReplyComments(resReplyComment.data);
        console.log(resReplyComment.data);
    }
    fetchReplyComment();
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
    const dataNewReply = {
        content: nameReply,
        userId: {
            _id: user?._id,
            avatar: user?.avatar,
            username: user?.username,
        },
        likes: [],
        commentId: comment?._id,
    }
    console.log(dataNewReply);
    const listReplyComment = [...replyComments];
    listReplyComment.push(dataNewReply);
    setReplyComments(listReplyComment);
    const fetchSubmitReplyComment = async () => {
        await axios.post(`/replycomment/`, dataReply);
    }
    fetchSubmitReplyComment();
    setNameReply("");
    
  };
  return (
    <div className="comment-container">
      <div className="post-itemComment">
        <Link
          to={`/profile/${comment ? comment.userId : ""}`}
          className="post-itemComment-avatar"
        >
          <img
            src={avatarComment ? avatarComment : PF + "noAvatar.png"}
            alt="Avatar"
          />
        </Link>
        <div className="post-itemComment-body">
          <div className="post-itemComment-body-top">
            <Link
              to={`/profile/${comment ? comment.userId : ""}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <b>{nameComment ? nameComment : ""}</b>
            </Link>
            <span>{comment.content}</span>
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
            {comment.userId === user._id && (
              <>
                <span>Chỉnh sửa</span>
                <span>Xóa</span>
              </>
            )}
            <span>Báo cáo</span>
          </div>
        </div>
      </div>

      <div className="post-listReplyComment">
          {replyComments && replyComments.map((replyComment, index) => (
              <ReplyComment
                key={index}
                replyComment={replyComment}
                isOpenReplyComment={isOpenReplyComment}
                setIsOpenReplyComment={setIsOpenReplyComment}
                handleClickReply = {handleClickReply}
              />
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
    </div>
  );
}

export default Comment;
