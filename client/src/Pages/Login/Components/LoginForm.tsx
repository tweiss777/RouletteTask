import "../scss/loginForm.scss";
import { useState } from "react";
import CredentialsDTO from "../../../DTOS/credentials.dto";
import { Link } from 'react-router-dom';
interface IProps {
    handleSubmit: (loginForm: CredentialsDTO) => void;
    disableLoginBtn?: boolean;
    errorMessage?: string;
}

export default function LoginForm({
    handleSubmit,
    disableLoginBtn,
    errorMessage,
}: IProps) {
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
        rememberMe: false,
    });

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    }

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleSubmit(loginForm);
    }

    return (
        <div className="login-form">
            <form onSubmit={handleLogin}>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="username-field">
                    <label>Username</label>
                    <input
                        onChange={handleOnChange}
                        type="text"
                        name="username"
                        value={loginForm.username}
                    />
                </div>

                <div className="password-field">
                    <label>Password</label>
                    <input
                        onChange={handleOnChange}
                        type="password"
                        name="password"
                        value={loginForm.password}
                    />
                </div>

                
                <div className="login-button">
                    <input disabled={disableLoginBtn} type="submit" value="Login" />
                </div>
            </form>
            <Link to="/register">Register</Link>
        </div>
    );
}
