import "./UserLoginSmall.css";

function UserLoginSmall({user}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <div className="userloginsmall" title={user?.username}>    
                <div className="userloginsmall-img">
                    <img src={user?.avatar || (PF + "noAvatar.png")} alt="image" />
                </div>
                <div className="userloginsmall-info">
                    <span>{user?.username.length > 15 ? user?.username.slice(0, 13) + "..." : user?.username}</span>
                </div>
            </div>
        </>
    )
}

export default UserLoginSmall;