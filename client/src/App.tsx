import "./App.css";
import { AuthContextProvider } from "./Contexts/auth.context";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function App() {
    const navigate = useNavigate()
    useEffect(() => {
       navigate('/dashboard') 
    },[])
    return (
        <>
            <AuthContextProvider>
                <Outlet/>
            </AuthContextProvider>
        </>
    );
}

export default App;
