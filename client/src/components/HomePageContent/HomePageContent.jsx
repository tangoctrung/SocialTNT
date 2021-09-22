import React from 'react';
import CreatePost from '../CreatePost/CreatePost';
import PostList from '../PostList/PostList';
import "./HomePageContent.css";

function HomePageContent(props) {
    return (
        <div className="home-page-content">
            <CreatePost />
            <PostList />
        </div>
    );
}

export default HomePageContent;