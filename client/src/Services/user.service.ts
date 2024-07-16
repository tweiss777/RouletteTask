import CredentialsDTO from "../DTOS/credentialsDTO";
import UnauthorizedException from "../Errors/unauthorized.exception";
import InternalServerError from "../Errors/internal.exception";
import axios from "axios";
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
