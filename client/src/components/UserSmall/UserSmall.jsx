import React from 'react';
import "./UserSmall.css";
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

function UserSmall({data}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <Link to={`/profile/${data._id}`} style={{textDecoration: 'none', color: 'black'}} className="all-user-container-itemUser">
            <div className="all-user-container-itemUser-img">
                <img src={data?.avatar || (PF + "noAvatar.png")} alt="image"/>
            </div>
            <div className="all-user-container-itemUser-info">
                <h3>{data && data.username}</h3>
                {data && data.hometown && <p>Đến từ <b>{data.hometown}</b> </p>}
                <p>Tham gia vào <b>{data && format(data.createdAt)}</b> trước.</p>
            </div>
        </Link>
    );
};

export default UserSmall;