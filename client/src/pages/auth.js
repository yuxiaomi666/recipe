import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    );
};

const Login = () => {
    // 先看更简单的register
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // 2 values is already set. don't need cookies value, only need setCookies func;
    // useCookies is used with useState
    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();
    
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            // 把response接下来了
            const response = await axios.post("http://localhost:3001/auth/login", {
                username, password
            });

            // cuz send back a jason with token field + userID field
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            // redirct to homepage, recommend import useNavigate, though tons of ways to do this
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Form 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword}
            label="Login"
            onSubmit={onSubmit}
        />
    );
};

const Register = () => {
    // React16的一个写法，[a,b]里b是函数，a是名字，把b函数结果assign给a
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const json = {
        // 不可以合并写吗
        username: username,
        password: password
    }

    // use axios给后端发request（handle form request）
    const onSubmit = async (event) => {
        // 阻止argv-event的默认form submission-refresh
        event.preventDefault();
        try {
            // make an HTTP POST request to a local server, sending (request) data in {}
            // 但response是什么，都没有区别
            await axios.post("http://localhost:3001/auth/register", {
                username, password
            });
            // cuz it's in try, so happens when suceed
            alert("Registration completed! Now login.");
        } catch (err) {
            // python的print红色，正常是console.log。console=terminal
            console.error(err);
        }
    };

    return (
        <Form 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword}
            label="Register"
            onSubmit={onSubmit}
        />
    );
};

const Form = ({username, setUsername, password, setPassword, label, onSubmit }) => {
    return (
        // classname和html里的对应的
        <div className="auth-container">
            {/* 写在form里的原因:form才有onsubmit */}
            <form onSubmit={onSubmit}>
                <h2> {label} </h2>
                <div className="form-group">
                    {/* label是显示的方块，input是输入的方块 */}
                    <label htmlFor="username"> Username:</label>
                    {/* onchange是点到了会触发什么function。event.target.value是框里的东西 */}
                    <input 
                      type="text" 
                      id="username"
                    //   看起来不写这行效果一样 
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password"> Password:</label>
                    <input 
                    // type是password的话html中会显示**
                      type="password" 
                      id="password" 
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
    
                <button type="submit"> {label} </button>
            </form>
        </div>);
}