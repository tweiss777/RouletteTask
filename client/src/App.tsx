import { Outlet } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./Contexts/auth.context";

function App() {
    return (
        <>
            <AuthContextProvider>
                <Outlet />
            </AuthContextProvider>
        </>
    );
}

export default App;
