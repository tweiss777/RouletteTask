import { createContext, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
export interface AuthContextProps {
    token: string;
    userId: string;
    isAuthenticated: boolean;
    login: (token: string) => void;
    isUserLoggedIn: () => boolean;
    logout: () => void;
}

interface IProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
    logout: () => { },
    login: (_token: string) => { },
    isUserLoggedIn: () => false,
    isAuthenticated: false,
    token: '',
    userId: '',
});

export const AuthContextProvider = ({ children }: IProps) => {
    const [token, setToken] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const login = (token: string) => {
        const decodedToken: any = jwtDecode(token);
        setToken(token);
        setUserId(decodedToken.user_id);
        setIsAuthenticated(true);
        setCookie('token', token, { path: '/' });
        navigate('/dashboard');
    };
    function isUserLoggedIn() {
        if (cookies.token) {
            const decodedToken: any = jwtDecode(cookies.token); 
            setToken(cookies.token);
            setUserId(decodedToken.user_id);
            setIsAuthenticated(true);
            return true
        }
        return false
    }

    const logout = () => {
        setToken('');
        setUserId('');
        setIsAuthenticated(false);
        removeCookie('token');
        navigate('/login');
    };

    return (
        <AuthContext.Provider
            value={{ token, userId, isAuthenticated, login, logout, isUserLoggedIn }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
