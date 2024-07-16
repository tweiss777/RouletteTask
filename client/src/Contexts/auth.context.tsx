import { createContext } from "react";

export interface AuthContextProps {
    token: string;
    userId: string;
    isAuthenticated: boolean;
    login: (token: string, userId: string) => void;
    logout: () => void;
}

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const AuthContext = createContext<AuthContextProps>({
    logout: () => { },
    login: (token: string, userId: string) => { },
    isAuthenticated: false,
    token: "",
    userId: "",

});

export default function AuthContextProvider({ children }: IProps) {

    return <AuthContext.Provider value={ { logout: () => { }, login: (token: string, userId: string) => { }, isAuthenticated: false, token: "", userId: "" } }> { children } </AuthContext.Provider>);
}
