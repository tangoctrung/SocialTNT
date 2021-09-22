import axios from 'axios';
import { Context } from 'context/Context';
import React, { useContext, useEffect, useState } from 'react';
import Post from '../Post/Post';
import "./PostList.css";

function PostList() {

    const [posts, setPosts] = useState([]);
    const { user, dispatch, isLoadPost } = useContext(Context);

    useEffect(() => {
        dispatch({ type: "LOADING_POST_START"});
        const FetchPostTimeLine = async () => {
            const res = await axios.get(`/posts/timeline/${user._id}`);
            setPosts(
                res.data.sort((p1, p2) => {
                  return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
              );
            dispatch({ type: "LOADING_POST_SUCCESS"});
        }
        FetchPostTimeLine();
    }, [user._id])
    return (
        <div className="PostList">
            {posts && !isLoadPost && posts.map((post, index) => <Post post={post} key={index}/> )} 
            {posts.length === 0 && !isLoadPost && <div>Bạn chưa có bài viết nào liên quan</div>}  
            {isLoadPost && <div className="PostList-fetching"> <div className="spinner-3"></div><p>LOADING...</p></div>}                                   
        </div>
    );
}

export default PostList;