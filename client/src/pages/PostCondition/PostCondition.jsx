import axios from 'axios';
import Post from 'components/Post/Post';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import "./PostCondition.css";

function PostCondition() {
    const [posts, setPosts] = useState([]);
    const location = useLocation();
    const hashtag = location.search.split("=")[1];
    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`/posts?hashtag=${hashtag}`);
            setPosts(res.data);
        }
        fetchPost();
    }, [hashtag])
    return (
        <div className="postCondition">
            <div className="postCondition-left">
                <div className="postCondition-left-top">
                    <p>Bạn đang tìm kiếm <b>hashtag</b></p>
                    <h2>#{hashtag}</h2>
                </div>
                <div className="postCondition-left-bottom">
                    <p>Những <b>hashtag</b> đang hot</p>
                    <div className="postCondition-left-bottom-container">
                        <Link to={`postcondition?hashtag=thiennhien`} style={{textDecoration: 'none', color: 'black'}}  ><p>#thiennhien</p></Link>
                        <p>#quocgia</p>
                        <p>#phim</p>
                        <p>#sieuanhhung</p>
                        <p>#web</p>
                    </div>
                </div>
            </div>
            <div className="postCondition-center">
                {posts && posts.length > 0 && posts.map((post, index) => (
                    <Post post={post} post={post} key={index}/>
                ))}
                {posts.length === 0 && <span className="postCondition-center-text">Không tìm thấy bài viết nào</span>}
            </div>
            <div className="postCondition-right">
                
            </div>
        </div>
    );
};

export default PostCondition;