import React, { useContext } from 'react';
import "./Leftbar.css";
import { Context } from 'context/Context';
import { Link } from 'react-router-dom';
import URL from 'config/config';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from 'config/configUrl';

function Leftbar() {
    const PF = URL.urlNoAvatar;
    const { user, socket} = useContext(Context);
    const [listNoti, setListNoti] = useState([]);

    useEffect(() => {
        const fetchNoti = async () => {
            const res = await axios.get(baseUrl + `/notifications/getNotification/${user?._id}`);
            // const list = res.data;
            const list = [...listNoti];
            res.data.forEach( (noti) => {
                if (!noti.readNotiId.includes(user?._id) && !noti.deleteNotiId.includes(user?._id)) {
                    list.push(noti); 
                }
            });
            setListNoti(list);
        }
        fetchNoti();
    }, [user?._id])
    useEffect(() => {
        socket?.on("createPostToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
        });
        socket?.on("likePostNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
        });
        socket?.on("commentPostNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
        })
        socket?.on("replyCommentPostNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
        })
        socket?.on("likeCommentNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
        })
    }, [listNoti]) 

    return (
        <div className="leftbar">
            <Link to={`/profile/${user?._id}`} style={{textDecoration: "none"}} className="leftbar-item image">
                <img src={user?.avatar ? (user?.avatar) : (PF)} />
                <span>{user?.username}</span>
            </Link>
            <div className="leftbar-top">
                <Link to="/" style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-home"></i>
                    <span>Trang ch???</span>
                </Link>
                <Link to="/notification" style={{textDecoration: "none"}} className="leftbar-item">
                    <div className="leftbar-item-div">
                        <i className="fas fa-bell"></i>
                        {listNoti.length > 0 && <strong>
                            {listNoti.length > 99 ? "99+" : listNoti.length}
                        </strong>}
                    </div>
                    <span>Th??ng b??o</span>
                </Link>
                <Link to="/alluser" style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-user-friends"></i>
                    <span>Ng?????i d??ng</span>
                </Link>
                <Link to="/chat" style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-comments"></i>
                    <span>Tin nh???n</span>
                </Link>
                <Link to="/postSaved" style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-bookmark"></i>
                    <span>???? l??u</span>
                    {user?.postSaved.length > 0 && <strong>
                        {user?.postSaved.length > 20 ? "20+" : user?.postSaved.length}
                    </strong>}
                </Link>
        
            </div>
            <div className="leftbar-bottom">
                <p>Nh???ng ch??? ????? b??i vi???t m?? b???n quan t??m</p>
                <Link to={`/postthemen?themen=Th??? gi???i`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-globe-americas"></i>
                    <span>Th??? gi???i</span>
                </Link>
                <Link to={`/postthemen?themen=Khoa h???c c??ng ngh???`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-user-astronaut"></i>
                    <span>Khoa h???c, C??ng ngh???</span>
                </Link>
                <Link to={`/postthemen?themen=Gi??o d???c`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-school"></i>
                    <span>Gi??o d???c</span>
                </Link>
                <Link to={`/postthemen?themen=V??n h??a`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-skiing-nordic"></i>
                    <span>V??n h??a</span>
                </Link>
                <Link to={`/postthemen?themen=Y t???`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-hospital-user"></i>
                    <span>Y t???</span>
                </Link>
                <Link to={`/postthemen?themen=Gi???i tr??`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-person-booth"></i>
                    <span>Gi???i tr??</span>
                </Link>
                <Link to={`/postthemen?themen=Du l???ch`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-plane-departure"></i>
                    <span>Du l???ch</span>
                </Link>
                <Link to={`/postthemen?themen=S???c kh???e`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-hands-heart"></i>
                    <span>S???c kh???e</span>
                </Link>
                <Link to={`/postthemen?themen=Th??? thao`} style={{textDecoration: "none"}} className="leftbar-item">
                    <i className="fas fa-futbol"></i>
                    <span>Th??? thao</span>
                </Link>
            </div>
            <div className="leftbar-text">
                <span>SocialTNT@2021. ???? ????ng k?? b???n quy???n.</span>
            </div>
            
            
        </div>
    );
}

export default Leftbar;