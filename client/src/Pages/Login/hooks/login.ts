import { useState } from "react";
import CredentialsDTO from "../../../DTOS/credentials.dto";
import UnauthorizedException from "../../../Errors/unauthorized.exception";
import useAuthContext from "../../../hooks/useAuthContext";
import { loginUser } from "../../../Services/user.service";
import RegistrationDTO from "../../../DTOS/registration.dto";

export default function useLogin() {
    const [disableBtn, setDisableLoginBtn] = useState(false);
    const [error, setError] = useState<string>("");
    const { setUserData }  = useAuthContext();
    async function login(credentials: CredentialsDTO) {
        try {
            if (error) setError("");
            const data = await loginUser(credentials);
            setDisableLoginBtn(true);
            if (data?.token) {
                const token = data.token;
                setUserData(token);
            }
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                setError(error.message);
                return;
            }
            setError("Something went wrong");
            
        } finally {
            setDisableLoginBtn(false);
        }
    }

    function register(registrationForm: RegistrationDTO) {
        throw new Error("Function not implemented.");

    }

    return {
        disableBtn,
        error,
        login, 
        register
    };
}
