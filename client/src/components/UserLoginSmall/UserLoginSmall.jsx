import "./UserLoginSmall.css";

function UserLoginSmall({user}) {

    return (
        <>
            <div className="userloginsmall" title={user?.username}>    
                <div className="userloginsmall-img">
                    <img src={user?.avatar} alt="image" />
                </div>
                <div className="userloginsmall-info">
                    <span>{user?.username.length > 15 ? user?.username.slice(0, 13) + "..." : user?.username}</span>
                </div>
            </div>
        </>
    )
}

export default UserLoginSmall;