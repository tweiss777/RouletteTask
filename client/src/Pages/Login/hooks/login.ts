import { useState } from "react";
import CredentialsDTO from "../../../DTOS/credentials.dto";
import UnauthorizedException from "../../../Errors/unauthorized.exception";
import useAuthContext from "../../../hooks/useAuthContext";
import { loginUser, registerUser } from "../../../Services/user.service";
import RegistrationDTO from "../../../DTOS/registration.dto";
import ConflictException from "../../../Errors/conflict.exception";
import BadRequestException from "../../../Errors/badRequest.exception";

export default function useLogin() {
    const [disableBtn, setDisableBtn] = useState(false);
    const [error, setError] = useState<string>("");
    const { setUserData }  = useAuthContext();
    async function login(credentials: CredentialsDTO) {
        try {
            if (error) setError("");
            const data = await loginUser(credentials);
            setDisableBtn(true);
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
            setDisableBtn(false);
        }
    }

    async function register(registrationForm: RegistrationDTO) {
        try {
            setDisableBtn(true); 
            if (error) setError("");
            const data = await registerUser(registrationForm);
            if (data?.token) {
            const token = data.token;
                setUserData(token);
            }
        } catch (error: any) {
           if(error instanceof ConflictException || error instanceof BadRequestException) {
               setError(error.message); 
                return
           } 
            setError("Something went wrong");
        } finally{
            setDisableBtn(false);

        }

    }

    return {
        disableBtn,
        error,
        login, 
        register
    };
}
