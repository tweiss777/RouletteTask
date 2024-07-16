import { createContext, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
export interface AuthContextProps {
    token: string;
    userId: string;
    isAuthenticated: boolean;
    setUserData: (token: string) => void;
    isUserLoggedIn: () => void;
    logout: () => void;
}

interface IProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
    logout: () => { },
    setUserData: (_token: string) => { },
    isUserLoggedIn: () => { },
    isAuthenticated: false,
    token: "",
    userId: "",
});

export const AuthContextProvider = ({ children }: IProps) => {
    const [token, setToken] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const setUserData = (token: string) => {
        const decodedToken: any= jwtDecode(token);
        setToken(token);
        setUserId(decodedToken.user_id);
        setIsAuthenticated(true);
        setCookie("token", token, { path: "/" });
        //redirect user to dashboard
    };
    function isUserLoggedIn() {
        if (cookies.token) {
            setUserData(cookies.token);
            setIsAuthenticated(true);
        }
    }

    const logout = () => {
        setToken("");
        setUserId("");
        setIsAuthenticated(false);
        removeCookie("token");
    };

    return (
        <AuthContext.Provider
            value={{ token, userId, isAuthenticated, setUserData, logout, isUserLoggedIn }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
