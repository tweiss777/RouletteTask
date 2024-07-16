import LoginForm from "./Components/LoginForm";
import useLogin from "./hooks/login";
import "./scss/login.scss";
export default function Login() {
    const { disableLoginBtn, error, login } = useLogin();

    return (
        <div className="login-page-container">
            <div className="login-form-panel">
                <div className="login-page-title">
                    <h1>Notes App.</h1>
                </div>
                <div className="login-form-container">
                    <LoginForm
                        errorMessage={error}
                        disableLoginBtn={disableLoginBtn}
                        handleSubmit={login}
                    />
                    
                </div>
            </div>
            <div className="login-background-panel"></div>
        </div>
    );
}
