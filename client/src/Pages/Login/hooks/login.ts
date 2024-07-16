import { useState } from "react";
import CredentialsDTO from "../../../DTOS/credentialsDTO";
import UnauthorizedException from "../../../Errors/unauthorized.exception";
import { loginUser } from "../../../Services/user.service";

export default function useLogin() {
    const [disableLoginBtn, setDisableLoginBtn] = useState(false);
    const [error, setError] = useState<string>("");
    async function login(credentials: CredentialsDTO) {
        try {
            if (error) setError("");
            const data = await loginUser(credentials);
            setDisableLoginBtn(true);
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

    return {
        disableLoginBtn,
        error,
        login,
    };
}
