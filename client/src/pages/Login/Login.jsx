import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";
import { useContext } from "react";
import { Context } from "context/Context";
import axios from "axios";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post("/auth/login", {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
            window.location.replace("/");
        } catch (err) {
            dispatch({type: "LOGIN_FAILURE"});
        }
    };
    return (
        <div className="login" onSubmit={handleSubmitForm}>
            <form className="login-form">
                <h2>SocialTNT</h2>
                <p>Đăng nhập để trải nghiệm với chúng tôi.</p>
                <input ref={emailRef} type="email" className="inputEmail" placeholder="Email của bạn"/>
                <input ref={passwordRef} type="password" className="inputPassword" placeholder="Password của bạn"/>
                <button disabled={isFetching}>Đăng nhập</button>
                <span>Bạn chưa có tài khoản? <Link to="/register">Đăng kí ngay.</Link></span>
            </form>
        </div>
    );
}

export default Login;