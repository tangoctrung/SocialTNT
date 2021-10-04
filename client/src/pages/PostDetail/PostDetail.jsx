import React, { useEffect} from 'react';
import "./PostDetail.css";
import { useLocation } from 'react-router';
import axios from 'axios';
import { useState } from 'react';
import Post from 'components/Post/Post';


function PostDetail() {
    const location = useLocation();
    const postId = location.pathname.split("/")[2];
    const [post, setPost] = useState();
    useEffect(() => {
        const FetchAuthorPost = async () => {

            // API GET POST
            const resPost = await axios.get(`/posts/post/${postId}`);
            setPost(resPost.data);        
            console.log(resPost.data); 
        }
        FetchAuthorPost();
        // return (()=> FetchAuthorPost());
    }, [postId]);


    return (
        <div className="post-detail">
            <div className="postdetail">
                <Post post={post} />
            </div>
        </div>     
    );
}

export default PostDetail;