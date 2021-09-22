import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Register.css";

function Register() {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post("/auth/register", {
                username: username,
                email: email,
                password: password,
            });
            console.log(res.data);
            res.data && window.location.replace('/login');
        } catch (error) {
            setError(true);
        }
        
    }
    return (
        <div className="register">
            <form className="register-form" onSubmit={handleSubmitForm}>
                <h2>SocialTNT</h2>
                <p>Đăng kí để trở thành thành viên của chúng tôi.</p>
                <input type="text" className="inputUsername" placeholder="Username của bạn" onChange={(e)=> setUsername(e.target.value)} />
                <input type="email" className="inputEmail" placeholder="Email của bạn" onChange={(e)=> setEmail(e.target.value)} />
                <input type="password" className="inputPassword" placeholder="Password của bạn" onChange={(e)=> setPassword(e.target.value)} />
                <button type="submit">Đăng kí</button>
                <span>Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay.</Link></span>
            </form>
        </div>
    );
}
export default Register;