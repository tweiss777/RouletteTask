import { Link } from "react-router-dom";
import RegistrationDTO from "../../../DTOS/registration.dto";
import { useState } from "react";
import "../scss/registrationForm.scss";
interface IProps {
    handleRegistration: (loginForm: RegistrationDTO) => void;
    disableRegistrationBtn?: boolean;
    errorMessage?: string;
}

export default function RegistrationForm({
    handleRegistration,
    errorMessage,
    disableRegistrationBtn,
}: IProps) {
    const [registrationForm, setRegistrationForm] = useState<RegistrationDTO>({
        username: "",
        password: "",
        confirmPassword: "",
    });

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setRegistrationForm({
            ...registrationForm,
            [e.target.name]: e.target.value,
        });
    }

    function register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleRegistration(registrationForm);
    }
    return (
        <div className="registration-form">
            <form onSubmit={register}>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="username-field">
                    <label>Username</label>
                    <input
                        onChange={handleOnChange}
                        type="text"
                        name="username"
                        value={registrationForm.username}
                    />
                </div>

                <div className="password-field">
                    <label>Password</label>
                    <input
                        onChange={handleOnChange}
                        type="password"
                        name="password"
                        value={registrationForm.password}
                    />
                </div>
                <div className="cofirm-password-field">
                    <label>Confirm Password</label>
                    <input
                        onChange={handleOnChange}
                        type="password"
                        name="confirmPassword"
                        value={registrationForm.confirmPassword}
                    />
                </div>
                <div className="register-button">
                    <input
                        disabled={disableRegistrationBtn}
                        type="submit"
                        value="Register"
                    />
                </div>
            </form>
            <Link to="/login">Login</Link>
        </div>
    );
}
