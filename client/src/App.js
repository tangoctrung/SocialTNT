import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PostDetail from './pages/PostDetail/PostDetail';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from 'context/Context';
import AllUser from 'pages/AllUser/AllUser';
import Chat from 'pages/Chat/Chat';
import PostSaved from 'pages/PostSaved/PostSaved';
import PostCondition from 'pages/PostCondition/PostCondition';
import PostThemen from 'pages/PostThemen/PostThemen';
import Notification from 'pages/Notification/Notification';
import NotificationFast from 'components/NotificationFast/NotificationFast';
import audioUrl from "../src/sound/SendMessage.wav";
import { useRef } from 'react';
import { axiosInstance } from 'config/configUrl';

function App() {
    const audioRef = useRef();
    const { user, socket, accessToken, dispatch } = useContext(Context);
    const [isNotiCreatePost, setIsNotiCreatePost] = useState(false);
    const [listNoti, setListNoti] = useState([]);

    // thông báo createPost, likePost, commentPost
    useEffect(() => {
        socket?.on("createPostToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
            audioRef?.current?.play();
        });
        socket?.on("likePostNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
            audioRef?.current?.play();
        });
        socket?.on("commentPostNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
            audioRef?.current?.play();
        })
        socket?.on("replyCommentPostNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
            audioRef?.current?.play();
        })
        socket?.on("likeCommentNotiToClient", (noti) => {
            let newNoti = [...listNoti];
            newNoti.push(noti);
            setListNoti(newNoti);
            setIsNotiCreatePost(true);
            audioRef?.current?.play();
        })
    }, [])   
    setTimeout(() => {
        if(isNotiCreatePost) {
            setIsNotiCreatePost(false);
        }
    }, 5000)

    useEffect( async () => {
        if (accessToken) {
            const res = await axiosInstance.get('/auth/', {
                headers: {
                  Authorization: 'Bearer ' + accessToken //the token is a variable which holds the token
                }
            });
            dispatch({type: "NO_LOGIN", payload: res.data});
        }
    }, []);

    const handleClickNotiFast = async (noti, index) => {
        const dataNoti = {
            userId: user?._id,
            notiId: noti?._id
        }
        await axiosInstance.put(`/notifications/updateNotification`, dataNoti);
    }

  return (
    <div className="App">
      
      <Router>
          <Navbar />
          <audio controls style={{display: 'none'}} ref={audioRef}>
            <source src={audioUrl} type="audio/mpeg" />
          </audio>
          <Switch>
              <Route path="/" exact>
                  {accessToken ? <HomePage /> : <Login />}    
              </Route>
              <Route path="/post/:id" exact>
                  {accessToken ? <PostDetail /> : <Login />} 
              </Route>
              <Route path="/profile/:id" exact>
                  {accessToken ? <Profile /> : <Login />} 
              </Route>
              <Route path="/login" exact>
                  <Login />
              </Route>
              <Route path="/register" exact>
                  <Register />
              </Route>
              <Route path="/alluser" exact>            
                  {accessToken ? <AllUser /> : <Login />} 
              </Route>
              <Route path="/chat" exact>
                {accessToken ? <Chat /> : <Login />} 
              </Route>
              <Route path="/chat/:id" exact>
                {accessToken ? <Chat /> : <Login />} 
              </Route>
              <Route path="/postsaved" exact>
                {accessToken ? <PostSaved /> : <Login />} 
              </Route>
              <Route path="/postcondition" exact>
                {accessToken ? <PostCondition /> : <Login />} 
              </Route>
              <Route path="/postthemen" exact>
                {accessToken ? <PostThemen /> : <Login />} 
              </Route>
              <Route path="/notification" exact>
                {accessToken ? <Notification /> : <Login />} 
              </Route>
          </Switch>
          {isNotiCreatePost && 
                <div className="homePage-noti">
                    {listNoti && listNoti.map( (noti, index) => (
                        <div key={index} onClick={() => handleClickNotiFast(noti, index)}>
                            <NotificationFast noti={noti} />
                        </div>
                    ))}
                </div>}
      </Router>
    </div>
  );
}

export default App;
