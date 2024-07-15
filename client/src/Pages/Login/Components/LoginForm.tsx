import { useState } from "react";
import CredentialsDTO from "../../../DTOS/credentialsDTO";
interface IProps {
  handleSubmit: (loginForm: CredentialsDTO) => void;
}

export default function LoginForm({ handleSubmit }: IProps) {
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
    console.log(loginForm);
  }

  function onSubmit() {
    handleSubmit(loginForm);
  }

  return (
    <div className="login-form">
      <form onSubmit={onSubmit}>
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
            type="text"
            name="username"
            value={loginForm.password}
          />
        </div>

        <div className="remember-me-field">
          <label>Remember me</label>
          <input onChange={handleOnChange} type="checkbox" name="rememberMe" />
        </div>
      </form>
      <div className="login-button">
        <button type="submit">Login</button>
      </div>
    </div>
  );
}
