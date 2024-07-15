import CredentialsDTO from "../../DTOS/credentialsDTO";
import LoginForm from "./Components/LoginForm";

export default function Login() {
  function login(credentials: CredentialsDTO) {
    console.log(credentials);
  }

  return (
    <div className="login-page-container">
      <div className="login-form-panel">
        <div className="login-page-title">
          <h1>Login</h1>
        </div>
        <LoginForm handleSubmit={login} />
      </div>
      <div className="login-background-panel"></div>
    </div>
  );
}
