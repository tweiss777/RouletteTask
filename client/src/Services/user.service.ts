import CredentialsDTO from "../DTOS/credentials.dto";
import UnauthorizedException from "../Errors/unauthorized.exception";
import InternalServerError from "../Errors/internal.exception";
import axios from "axios";
import RegistrationDTO from "../DTOS/registration.dto";
import ConflictException from "../Errors/conflict.exception";
import BadRequestException from "../Errors/badRequest.exception";
export async function loginUser(credentials: CredentialsDTO) {
    try {
        const response = await axios.post("/api/v1/users/login", credentials);
        return response.data;
    } catch (error: any) {
        if (error.response.status === 401) {
            throw new UnauthorizedException(error.response.data.message);
        }
        throw new InternalServerError("Something went wrong");
    }
}

export async function registerUser(registrationForm: RegistrationDTO) {
    try {
        console.log(registrationForm);
        const response = await axios.post("/api/v1/users/register", {
            ...registrationForm,
            confirm_password: registrationForm.confirmPassword,
        });
        return response.data;
    } catch (error: any) {
        switch (error.response.status) {
            case 409:
                throw new ConflictException(error.response.data.message);
            case 400:
                throw new BadRequestException(error.response.data.message);
            default:
                throw new InternalServerError("Something went wrong");
        }
    }
}
