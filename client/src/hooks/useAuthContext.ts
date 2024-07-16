import AuthContext from "../Contexts/auth.context";
import { useContext } from "react";
const useAuthContext = () => useContext(AuthContext);
export default useAuthContext
