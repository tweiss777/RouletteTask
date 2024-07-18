import "./App.css";
import { AuthContextProvider } from "./Contexts/auth.context";
import OutletWrapper from "./Components/OutletWrapper";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <AuthContextProvider>
                <Outlet/>
            </AuthContextProvider>
        </>
    );
}

export default App;
