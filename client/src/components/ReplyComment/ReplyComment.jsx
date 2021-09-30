import React from "react";
import "./ReplyComment.css";

import { Link } from "react-router-dom";

import avatar from "../../image/avatar.jpg";
import { format } from "timeago.js";
import { Context } from "context/Context";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";

function ReplyComment({
  replyComment,
  isOpenReplyComment,
  setIsOpenReplyComment,
  handleClickReply,
}) {
  const { user } = useContext(Context);
  const [isLikeComment, setIsLikeComment] = useState(
    replyComment.likes?.includes(user?._id)
  );

  const [totalLikeComment, setTotalLikeComment] = useState(
    replyComment?.likes?.length
  );
  // LIKE/UNLIKE COMMENT
  const handleLikedComment = () => {
    const fetchLikedComment = async () => {
      await axios.put(`/replycomment/likereplyComment`, {
        replyCommentId: replyComment?._id,
        userId: user?._id,
      });
    };
    fetchLikedComment();
    setTotalLikeComment(
      !isLikeComment ? totalLikeComment + 1 : totalLikeComment - 1
    );
    setIsLikeComment(!isLikeComment);
  };
  const handleClickReplyComment = () => {
    setIsOpenReplyComment(!isOpenReplyComment);
    handleClickReply(replyComment?.userId?.username);
  };

  return (
    <div className="post-itemReplyComment">
      <Link to={`/profile/${replyComment?.userId?._id}`} className="post-listReplyComment-avatar">
        <img src={replyComment?.userId?.avatar} alt="Avatar" />
      </Link>
      <div className="post-listReplyComment-body">
        <div className="post-listReplyComment-body-top">
          <Link to={`/profile/${replyComment?.userId?._id}`} style={{ textDecoration: "none", color: "black" }}>
            <b>{replyComment?.userId?.username}</b>
          </Link>
          <span>{replyComment?.content}</span>
        </div>
        <div className="post-listReplyComment-body-bottom">
          <p onClick={handleClickReplyComment}>Trả lời</p>
          <span>{format(replyComment?.createdAt)}</span>
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
      <div className="post-listReplyComment-menu">
        <i className="fas fa-ellipsis-v"></i>
        <div className="post-listReplyComment-menu-content">
            {replyComment?.userId?._id === user._id && (
              <>
                <span>Chỉnh sửa</span>
                <span>Xóa</span>
              </>
            )}
          <span>Báo cáo</span>
        </div>
      </div>
    </div>
  );
}

export default ReplyComment;
