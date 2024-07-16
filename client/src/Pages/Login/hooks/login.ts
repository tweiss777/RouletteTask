import { useState } from "react";
import CredentialsDTO from "../../../DTOS/credentials.dto";
import UnauthorizedException from "../../../Errors/unauthorized.exception";
import useAuthContext from "../../../hooks/useAuthContext";
import { loginUser } from "../../../Services/user.service";

export default function useLogin() {
    const [disableLoginBtn, setDisableLoginBtn] = useState(false);
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

    return {
        disableLoginBtn,
        error,
        login,
    };
}
