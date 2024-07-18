interface IProps {
  children: JSX.Element;
}
import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }: IProps) {
        const { isUserLoggedIn } = useAuthContext();

        return isUserLoggedIn() ? <>{children}</>: <Navigate to={"/login"} />;
}
