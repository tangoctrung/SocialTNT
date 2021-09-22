import React from 'react'
import { useState } from 'react';
import "./Chat.css";
import avatar from "../../image/avatar.jpg";
import avatar1 from "../../image/avatar1.jpg";
import avatar2 from "../../image/avatar2.jpg";
import avatar3 from "../../image/avatar3.jpg";
import avatar4 from "../../image/avatar4.jpg";

function Chat() {
    const [isOpenChatMember, setIsOpenChatMember] = useState(true);
    const [settingChat, setSettingChat] = useState(0);
    return (
        <div className="chat">
            
            <div className="chat-left">
                <div className="chat-left-1">
                    <h2>Chat</h2>
                    <i className="far fa-users-medical" title="Tạo nhóm chat"></i>
                </div>
                <div className="chat-left-2">
                    <input type="text" placeholder="Tìm kiếm theo tên người dùng hoặc nhóm chat" />
                </div>
                <div className="chat-left-3">
                    <span onClick={()=> setIsOpenChatMember(true)} className={isOpenChatMember ? "isActive" : ""} ><i className="fas fa-user-friends"></i>Bạn bè</span>
                    <span onClick={()=> setIsOpenChatMember(false)} className={isOpenChatMember ? "" : "isActive"} ><i className="fas fa-users"></i>Nhóm</span>
                </div>
                <div className="chat-left-4">
                    {isOpenChatMember && <div className="chat-left-4-member">

                        <div className="chat-left-4-member-item">
                            <div className="chat-left-4-member-item-img">
                                <img src={avatar} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>John Smith</h3>
                                <p>what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-member-item">
                            <div className="chat-left-4-member-item-img">
                                <img src={avatar} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>John Smith</h3>
                                <p>what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-member-item">
                            <div className="chat-left-4-member-item-img">
                                <img src={avatar} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>John Smith</h3>
                                <p>what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-member-item">
                            <div className="chat-left-4-member-item-img">
                                <img src={avatar} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>John Smith</h3>
                                <p>what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-member-item">
                            <div className="chat-left-4-member-item-img">
                                <img src={avatar} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>John Smith</h3>
                                <p>what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-member-item">
                            <div className="chat-left-4-member-item-img">
                                <img src={avatar} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>John Smith</h3>
                                <p>what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-member-item">
                            <div className="chat-left-4-member-item-img">
                                <img src={avatar} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>John Smith</h3>
                                <p>what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-member-item">
                            <div className="chat-left-4-member-item-img">
                                <img src={avatar} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>John Smith</h3>
                                <p>what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-member-item">
                            <div className="chat-left-4-member-item-img">
                                <img src={avatar} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>John Smith</h3>
                                <p>what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-member-item">
                            <div className="chat-left-4-member-item-img">
                                <img src={avatar} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>John Smith</h3>
                                <p>what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-member-item">
                            <div className="chat-left-4-member-item-img">
                                <img src={avatar} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>John Smith</h3>
                                <p>what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-member-item">
                            <div className="chat-left-4-member-item-img">
                                <img src={avatar} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>John Smith</h3>
                                <p>what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                    </div>}
                    {!isOpenChatMember && <div className="chat-left-4-group">

                        <div className="chat-left-4-group-item">
                            <div className="chat-left-4-group-item-img">
                                <img className="item-img-1" src={avatar} alt="image" />
                                <img className="item-img-2" src={avatar1} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>Front-end developers</h3>
                                <p><p style={{display: 'inline-block'}}>Smith:</p>  what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-group-item">
                            <div className="chat-left-4-group-item-img">
                                <img className="item-img-1" src={avatar2} alt="image" />
                                <img className="item-img-2" src={avatar3} alt="image" />
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>Back-end developers</h3>
                                <p><p style={{display: 'inline-block'}}>Smith:</p>  what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-group-item">
                            <div className="chat-left-4-group-item-img">
                                <img className="item-img-1" src={avatar1} alt="image" />
                                <img className="item-img-2" src={avatar4} alt="image" />
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>MERN Stack</h3>
                                <p><p style={{display: 'inline-block'}}>Smith:</p>  what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-group-item">
                            <div className="chat-left-4-group-item-img">
                                <img className="item-img-1" src={avatar} alt="image" />
                                <img className="item-img-2" src={avatar1} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>Front-end developers</h3>
                                <p><p style={{display: 'inline-block'}}>Smith:</p>  what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-group-item">
                            <div className="chat-left-4-group-item-img">
                                <img className="item-img-1" src={avatar2} alt="image" />
                                <img className="item-img-2" src={avatar3} alt="image" />
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>Back-end developers</h3>
                                <p><p style={{display: 'inline-block'}}>Smith:</p>  what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-group-item">
                            <div className="chat-left-4-group-item-img">
                                <img className="item-img-1" src={avatar1} alt="image" />
                                <img className="item-img-2" src={avatar4} alt="image" />
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>MERN Stack</h3>
                                <p><p style={{display: 'inline-block'}}>Smith:</p>  what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-group-item">
                            <div className="chat-left-4-group-item-img">
                                <img className="item-img-1" src={avatar} alt="image" />
                                <img className="item-img-2" src={avatar1} alt="image" />
                                <i className="fas fa-circle"></i>
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>Front-end developers</h3>
                                <p><p style={{display: 'inline-block'}}>Smith:</p>  what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-group-item">
                            <div className="chat-left-4-group-item-img">
                                <img className="item-img-1" src={avatar2} alt="image" />
                                <img className="item-img-2" src={avatar3} alt="image" />
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>Back-end developers</h3>
                                <p><p style={{display: 'inline-block'}}>Smith:</p>  what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-group-item">
                            <div className="chat-left-4-group-item-img">
                                <img className="item-img-1" src={avatar1} alt="image" />
                                <img className="item-img-2" src={avatar4} alt="image" />
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>MERN Stack</h3>
                                <p><p style={{display: 'inline-block'}}>Smith:</p>  what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-group-item">
                            <div className="chat-left-4-group-item-img">
                                <img className="item-img-1" src={avatar} alt="image" />
                                <img className="item-img-2" src={avatar1} alt="image" />
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>Front-end developers</h3>
                                <p><p style={{display: 'inline-block'}}>Smith:</p>  what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-group-item">
                            <div className="chat-left-4-group-item-img">
                                <img className="item-img-1" src={avatar2} alt="image" />
                                <img className="item-img-2" src={avatar3} alt="image" />
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>Back-end developers</h3>
                                <p><p style={{display: 'inline-block'}}>Smith:</p>  what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                        <div className="chat-left-4-group-item">
                            <div className="chat-left-4-group-item-img">
                                <img className="item-img-1" src={avatar1} alt="image" />
                                <img className="item-img-2" src={avatar4} alt="image" />
                            </div>
                            <div className="chat-left-4-member-item-text">
                                <h3>MERN Stack</h3>
                                <p><p style={{display: 'inline-block'}}>Smith:</p>  what are you doing?<span> 10 minutes</span></p>
                            </div>
                            <div className="chat-left-4-member-item-noti">
                                <i className="fas fa-circle"></i>
                            </div>
                        </div>
                    
                    </div>}
                </div>
            </div>
            
            <div className="chat-center">
                <div className="chat-center-1">
                    <div className="chat-center-1-infoUser">
                        <div className="chat-center-1-infoUser-img">
                            <img src={avatar} alt="image" />
                            <i className="fas fa-circle"></i>
                        </div>
                        <div className="chat-center-1-infoUser-name">
                            <b>John Smith</b> <br/>
                            <span>Đang hoạt động</span>
                        </div>
                    </div>
                    <div className="chat-center-1-call-call">
                        <i className="fas fa-video"></i>
                    </div>
                </div>
                <div className="chat-center-2">
                    <div className="chat-center-2-container">
                        <div className="chat-center-2-infoUser">
                            <img src={avatar} alt="image"/>
                            <h3>John Smith</h3>
                            <p>Tham gia từ <b>3 năm</b> trước.</p>
                        </div>
                        <div className="chat-center-2-listMessage">
                            <div className="chat-center-2-itemMessage">
                                <div className="chat-center-2-itemMessage-img">
                                    <img src={avatar} alt="image"/>
                                </div>
                                <div className="chat-center-2-itemMessage-text">
                                    <p>https://www.javatpoint.com/how-to-wrap-text-in-css#:~:text=How%20to%20wrap%20text%20in%20CSS%3F%20CSS%20word-wrap,is%20too%20long%20to%20fit%20in%20the%20container.</p>
                                    <span title="10:03 20-09-2021">5 minutes ago</span>
                                </div>
                                <div className="chat-center-2-itemMessage-infoMessage">
                                    <i className="fas fa-reply"></i>
                                    <i className="fas fa-times"></i>
                                </div>
                            </div>
                            <div className="chat-center-2-itemMessage">
                                <div className="chat-center-2-itemMessage-img">
                                    <img src={avatar} alt="image"/>
                                </div>
                                <div className="chat-center-2-itemMessage-text">
                                    <p>If the box needs to be a fixed size, or you are keen to ensure that long words can't overflow, then the overflow-wrap property can help. This property will break a word once it is too long to fit on a line by itself.</p>
                                    <span title="10:03 20-09-2021">5 minutes ago</span>
                                </div>
                                <div className="chat-center-2-itemMessage-infoMessage">
                                    <i className="fas fa-reply"></i>
                                    <i className="fas fa-times"></i>
                                </div>
                            </div>
                            <div className="chat-center-2-itemMessage">
                                <div className="chat-center-2-itemMessage-img">
                                    <img src={avatar} alt="image"/>
                                </div>
                                <div className="chat-center-2-itemMessage-text">
                                    <p>Làm bàitập chưa cu</p>
                                    <span title="10:03 20-09-2021">5 minutes ago</span>
                                </div>
                                <div className="chat-center-2-itemMessage-infoMessage">
                                    <i className="fas fa-reply"></i>
                                    <i className="fas fa-times"></i>
                                </div>
                            </div>
                            <div className="chat-center-2-itemMessage-sender">
                                <div className="chat-center-2-itemMessage-sender-infoMessage">
                                    <i className="fas fa-reply"></i>
                                    <i className="fas fa-times"></i>
                                </div>
                                <div className="chat-center-2-itemMessage-sender-text">
                                    <p>If the box needs to be a fixed size, or you are keen to ensure that long words can't overflow, then the overflow-wrap property can help. This property will break a word once it is too long to fit on a line by itself.</p>
                                    <span title="10:03 20-09-2021">5 minutes ago</span>
                                </div>
                            </div>
                            <div className="chat-center-2-itemMessage-sender">
                                <div className="chat-center-2-itemMessage-sender-infoMessage">
                                    <i className="fas fa-reply"></i>
                                    <i className="fas fa-times"></i>
                                </div>
                                <div className="chat-center-2-itemMessage-sender-text">
                                    <p>https://www.javatpoint.com/how-to-wrap-text-in-css#:~:text=How%20to%20wrap%20text%20in%20CSS%3F%20CSS%20word-wrap,is%20too%20long%20to%20fit%20in%20the%20container.</p>
                                    <span title="10:03 20-09-2021">5 minutes ago</span>
                                </div>
                            </div>
                            <div className="chat-center-2-itemMessage-sender">
                                <div className="chat-center-2-itemMessage-sender-infoMessage">
                                    <i className="fas fa-reply"></i>
                                    <i className="fas fa-times"></i>
                                </div>
                                <div className="chat-center-2-itemMessage-sender-text">
                                    <p>Làm bàitập chưa cu</p>
                                    <span title="10:03 20-09-2021">5 minutes ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat-center-3">
                    <div className="chat-center-3-micro">
                        <i className="fas fa-microphone" title="Gửi voice chat"></i>
                    </div>
                    <div className="chat-center-3-file">
                        <i className="fas fa-paperclip" title="Gửi ảnh, video, file"></i>
                    </div>
                    <div className="chat-center-3-input">
                        <input type="text" placeholder="Nhập tin nhắn muốn gửi" />
                    </div>
                    <div className="chat-center-3-emoji">
                        <i className="fas fa-smile" title="Gửi biểu tượng cảm xúc"></i>
                    </div>
                </div>
            </div>
            
            <div className="chat-right">
                <div className="chat-right-1">
                    <div className="chat-right-1-img">
                        <img src={avatar} alt="image"/>
                    </div>
                    <div className="chat-right-1-info">
                        <p>John Smith</p>                      
                    </div>
                </div>
                <div className="chat-right-2">
                    <div className="chat-right-2-selection">
                        <div className="chat-right-2-selection-1">
                            <div className={settingChat !== 1 ? "chat-right-2-list-1" : "chat-right-2-list-1 isActive"} onClick={()=> setSettingChat(1)}>
                                <i className="fas fa-film"></i>  
                                <span> Chủ đề</span>
                            </div>
                            <div className={settingChat !== 2 ? "chat-right-2-list-1" : "chat-right-2-list-1 isActive"} onClick={()=> setSettingChat(2)}>
                                <i className="fas fa-wrench"></i>  
                                <span> Cài đặt</span>
                            </div>
                        </div>
                        <div className="chat-right-2-selection-2">
                            <div className={settingChat !== 3 ? "chat-right-2-list-1" : "chat-right-2-list-1 isActive"} onClick={()=> setSettingChat(3)}>
                                <i className="fas fa-photo-video"></i>  
                                <span> Hình ảnh, video</span>
                            </div>
                            <div className={settingChat !== 4 ? "chat-right-2-list-1" : "chat-right-2-list-1 isActive"} onClick={()=> setSettingChat(4)}>
                                <i className="fas fa-paperclip"></i>  
                                <span> Tệp</span>
                            </div>
                            <div className={settingChat !== 5 ? "chat-right-2-list-1" : "chat-right-2-list-1 isActive"} onClick={()=> setSettingChat(5)}>
                                <i className="fas fa-link"></i>  
                                <span> Liên kết</span>
                            </div>
                        </div>
                    </div>
                    <div className="chat-right-2-content">
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />
                        <img  style={{height: "150px"}} src={avatar} />

                    </div>
 
                    
                </div>
            </div>
        </div>
    )
}

export default Chat;
