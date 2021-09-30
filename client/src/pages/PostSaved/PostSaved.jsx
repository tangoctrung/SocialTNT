import axios from 'axios';
import Leftbar from 'components/Leftbar/Leftbar';
import Post from 'components/Post/Post';
import { Context } from 'context/Context';
import PostSaveSmall from 'PostSaveSmall/PostSaveSmall';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import './PostSaved.css';

function PostSaved() {
    const { user } = useContext(Context);
    const [postSave, setPostSave] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPostSave = async () => {
            const res = await axios.get(`/users/savepost/${user?._id}`);
            setPosts(res.data);
        }
        fetchPostSave();
    }, [user]);

    return (
        <div className="postSaved">
            <div className="postSaved-left">
                <Leftbar />
            </div>
            <div className="postSaved-Content">
                <div className="postSaved-content-left">
                    <div className="postSaved-content-left-container">
                        {postSave && <Post post={postSave}/>}
                        {posts?.length !== 0 && !postSave && <p className="postsave-text"> Chọn bài viết đã lưu để xem chi tiết ở đây</p>}
                        {posts?.length === 0 && <p className="postsave-text">Chưa có bài viết nào được lưu.</p>}
                    </div>
                </div>
                <div className="postSaved-content-right">  
                    {posts?.length > 0 && <h2>Bài viết đã lưu</h2>}
                    {posts && posts.map((post, index) =>(
                        <div className="postSaved-top-content-item" onClick={()=>setPostSave(post)}>
                            <PostSaveSmall post={post} key={index} />                           
                        </div>                   
                    ))}                    
                </div>
            </div>
        </div>
    );
};

export default PostSaved;