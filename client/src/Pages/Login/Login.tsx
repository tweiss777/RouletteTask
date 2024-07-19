import LoginForm from "./Components/LoginForm";
import RegistrationForm from "./Components/RegistrationForm";
import useLogin from "./hooks/login";
import { useLocation } from "react-router-dom";
import "./scss/login.scss";
import LoginHeader from "./Components/LoginHeader";
export default function Login() {
  const { disableBtn, error, loginHandler, register } = useLogin();
  const { pathname } = useLocation();

  return (
    <div className="login-page-container">
      <div className="login-form-panel">
        <LoginHeader /> 
        <div className="login-form-container">
          {pathname.toLowerCase() === "/register" ? (
            <RegistrationForm
              errorMessage={error}
              disableRegistrationBtn={disableBtn}
              handleRegistration={register}
            />
          ) : (
            <LoginForm
              errorMessage={error}
              disableLoginBtn={disableBtn}
              handleSubmit={loginHandler}
            />
          )}
        </div>
      </div>
      <div className="login-background-panel"></div>
    </div>
  );
}
