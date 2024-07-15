import CredentialsDTO from "../../DTOS/credentialsDTO";
import LoginForm from "./Components/LoginForm";
import "./scss/login.scss";
export default function Login() {
  function login(credentials: CredentialsDTO) {
    console.log(credentials);
  }

  return (
    <div className="login-page-container">
      <div className="login-form-panel">
        <div className="login-page-title">
          <h1>Notes App.</h1>
        </div>
        <div className="login-form-container">
          <LoginForm handleSubmit={login} />
            <a href="/register">Register</a>
        </div>
      </div>
      <div className="login-background-panel"></div>
    </div>
  );
}
