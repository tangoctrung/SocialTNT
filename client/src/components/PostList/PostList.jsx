import axios from 'axios';
import { Context } from 'context/Context';
import React, { useContext, useEffect, useState } from 'react';
import Post from '../Post/Post';
import "./PostList.css";

function PostList() {

    const [posts, setPosts] = useState([]);
    const { user } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const FetchPostTimeLine = async () => {
            const res = await axios.get(`/posts/timeline/${user._id}`);
            setPosts(
                res.data.sort((p1, p2) => {
                  return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
              );
            setIsLoading(false);
        }
        FetchPostTimeLine();
    }, [user._id])
    return (
        <div className="PostList">
            {posts  && posts.map((post, index) => <Post post={post} key={index}/> )} 
            {posts.length === 0 && !isLoading  && <p>Bạn chưa có bài viết nào liên quan</p>}  
            {isLoading && <div className="postlist-Loading"><div className="spinner-5"></div><p>Đang tải bài viết</p></div>}
        </div>
    );
}

export default PostList;