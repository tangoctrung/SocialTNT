import React from "react";
import { useState } from "react";
import "./Chat.css";
import avatar from "../../image/avatar.jpg";
import avatar1 from "../../image/avatar1.jpg";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { Context } from "context/Context";
import { useContext } from "react";
import axios from "axios";
import Conversation from "components/Conversation/Conversation";
import ChatMessage from "components/ChatMessage/ChatMessage";
import InfoConversation from "components/InfoConversation/InfoConversation";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

function Chat() {
  const [isOpenChatMember, setIsOpenChatMember] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [noFollowings, setNoFollowings] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const { user } = useContext(Context);
  const [chatId, setChatId] = useState();
  const location = useLocation();
  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const [avatarGroup, setAvatarGroup] = useState();
  const PF = "http://localhost:8800/images/";

  // Lấy thông tin các following
  useEffect(() => {
    const fetchFollowings = async () => {
      const res = await axios.get(`/users/profile/followings/${user?._id}`);
      setFollowings(res.data);
    };
    fetchFollowings();
  }, []);

  // Lấy thông tin các user mà người dùng chưa follow
  useEffect(() => {
    const fetchFollowings = async () => {
      const res = await axios.get(`/users/nofollowings/${user?._id}`);
      setNoFollowings(res.data);
    };
    fetchFollowings();
  }, []);
  // GET ALL CONVERSATIONS OF USER
  useEffect(() => {
    const FetchUser = async () => {
      const res = await axios.get(`/conversations/${user && user._id}`);
      setConversations(res.data);
      console.log(res.data);
    };
    FetchUser();
  }, [user && user._id]);

  // NẾU ĐƯỜNG DẪN CÓ ID CỦA CUỘC NÓI CHUYỆN THÌ LẤY CUỘC NCH ĐÓ
  useEffect(() => {
    setChatId(location.pathname.split("/")[2]);
    const fetchDataChat = async () => {
      const res = await axios.get(`/conversations/chat/${chatId && chatId}`);
      setCurrentChat(res.data);
    };
    fetchDataChat();
  }, [location, chatId]);

  // LẤY TIN NHẮN CỦA MỘT CUỘC TRÒ CHUYỆN
  useEffect(() => {
    const FetchMessage = async () => {
      try {
        const res = await axios.get(`/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (e) {}
    };
    FetchMessage();
  }, [currentChat]);

  // create group
  const handleSubmitCreateGroup = async (e) => {
    e.preventDefault();
    setIsCreateGroup(false);
  };
 //  Chuyển sang list group
 const handleClickGroup = async (e) => {
    setIsOpenChatMember(false);
    const res = await axios.get(`/conversationsgroup/${user?._id}`);
    setGroupChats(res.data);
 }   
  return (
    <div className="chat">
      <div className="chat-left">
        <div className="chat-left-1">
          <h2>Chat</h2>
          <div className="chat-left-1-createGroup">
            <i
              className="far fa-users-medical"
              data-tip="Tạo nhóm chat"
              onClick={() => setIsCreateGroup(true)}
            ></i>
            <ReactTooltip place="bottom" type="dark" effect="solid" />
            {isCreateGroup && (
              <div className="createGroup">
                <div
                  className="createGroup-modal"
                  onClick={() => setIsCreateGroup(false)}
                ></div>
                <form
                  className="createGroup-content"
                  onSubmit={handleSubmitCreateGroup}
                >
                  <div className="createGroup-avatar-name">
                    <label
                      htmlFor="chooseAvatarGroup"
                      className="createGroup-avatar"
                    >
                      <img
                        src={avatarGroup ? avatarGroup : PF + "noAvatar.png"}
                        alt="image"
                        data-tip="Click để chọn avatar cho group"
                      />
                      <ReactTooltip place="bottom" type="dark" effect="solid" />
                      <input
                        id="chooseAvatarGroup"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) =>
                          setAvatarGroup(URL.createObjectURL(e.target.files[0]))
                        }
                      />
                    </label>
                    <div className="createGroup-name">
                      <input placeholder="Type name of Group..." />
                    </div>
                  </div>
                  <div className="createGroup-text">
                    <h4>Thêm thành viên</h4>
                  </div>
                  <div className="createGroup-listUser">
                    <b>Những người bạn đang theo dõi</b>
                    {followings &&
                      followings.map((following) => (
                        <div className="createGroup-itemUser">
                          <Link
                            className="createGroup-itemUser-link"
                            to={`/profile/${following._id}`}                          
                          >
                            <img
                              src={
                                following.avatar
                                  ? following.avatar
                                  : PF + "noAvatar.png"
                              }
                              alt="image"
                            />
                            <p>{following?.username}</p>
                          </Link>
                          <input type="checkbox" />
                        </div>
                      ))}

                    <b>Những người dùng được gợi ý</b>

                    {noFollowings &&
                      noFollowings.map((following) => (
                        <div className="createGroup-itemUser">
                          <Link
                            className="createGroup-itemUser-link"
                            to={`/profile/${following.userId}`}                          
                          >
                            <img
                              src={
                                following.avatar
                                  ? following.avatar
                                  : PF + "noAvatar.png"
                              }
                              alt="image"
                            />
                            <p>{following?.username}</p>
                          </Link>
                          <input type="checkbox" />
                        </div>
                      ))}
                  </div>
                  <div className="createGroup-button">
                    <button>CREATE</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="chat-left-2">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên người dùng hoặc nhóm chat"
          />
        </div>
        <div className="chat-left-3">
          <span
            onClick={() => setIsOpenChatMember(true)}
            className={isOpenChatMember ? "isActive" : ""}
          >
            <i className="fas fa-user-friends"></i>Bạn bè
          </span>
          <span
            onClick={handleClickGroup}
            className={isOpenChatMember ? "" : "isActive"}
          >
            <i className="fas fa-users"></i>Nhóm
          </span>
        </div>
        <div className="chat-left-4">
          {isOpenChatMember && (
            <div className="chat-left-4-member">
              {conversations &&
                conversations.map((conversation, index) => (
                  <div onClick={() => setCurrentChat(conversation)}>
                    <Conversation
                      key={index}
                      conversation={conversation}
                      currentUser={user}
                    />
                  </div>
                ))}
            </div>
          )}
          {!isOpenChatMember && (
            <div className="chat-left-4-group">
                {groupChats && groupChats.map((group) => (
                    <div className="chat-left-4-group-item">
                        <div className="chat-left-4-group-item-img">
                            <img className="item-img-1" src={group?.membersGroup[0]?.avatar} alt="image" />
                            <img className="item-img-2" src={group?.membersGroup[1]?.avatar} alt="image" />
                            <i className="fas fa-circle"></i>
                        </div>
                        <div className="chat-left-4-member-item-text">
                            <h3>{group?.nameGroup}</h3>
                            <p>
                                <p style={{ display: "inline-block" }}>Smith:</p> what are
                                you doing?<span> {format(group?.updatedAt)}</span>
                            </p>
                        </div>
                        <div className="chat-left-4-member-item-noti">
                            <i className="fas fa-circle"></i>
                        </div>
                    </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="chat-center">
        {currentChat ? (
          <ChatMessage
            messages={messages}
            currentChat={currentChat}
            setMessages={setMessages}
          />
        ) : (
          <span className="chat-text">
            Chọn cuộc hội thoại để bắt đầu nhắn tin.
          </span>
        )}
      </div>

      <div className="chat-right">
        <InfoConversation currentChat={currentChat && currentChat} />
      </div>
    </div>
  );
}

export default Chat;
