interface IProps {
  children: JSX.Element;
}
import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }: IProps) {
        const { isAuthenticated } = useAuthContext();

        return isAuthenticated ? <>{children}</>: <Navigate to={"/login"} />;
}
