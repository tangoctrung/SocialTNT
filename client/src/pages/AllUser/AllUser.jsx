import Leftbar from 'components/Leftbar/Leftbar';
import React from 'react';
import "./AllUser.css";
import { useState } from 'react';
import UserSmall from 'components/UserSmall/UserSmall';
import { useEffect } from 'react';
import axios from 'axios';

function AllUser() {

    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        const FetchAllUser = async () => {
            const res = await axios.get("/users/alluser");
            setListUser(res.data);
        }
        FetchAllUser();
    }, [])
    return (
        <div className="all-user">
            <div className="all-user-left">
                <Leftbar />
            </div>
            <div className="all-user-container">
                <div className="all-user-container-input">
                    <input type="text" placeholder="Nhập tên hoặc email của người dùng" />
                    <button type="submit">Tìm kiếm</button>
                </div>
                <div className="all-user-container-listUser">
                    {listUser && listUser.map((user, index)=> <UserSmall key={index} data={user} />)}                   
                </div>
            </div>
        </div>
    )
}

export default AllUser;