import { createRef } from "react";
import { createBrowserRouter } from 'react-router-dom'
import Login from "../Pages/Login/Login";
import App from "../App";
import Dashboard from "../Pages/Dashboard/Dashboard";
const routes = [
    {
        path: "/login",
        element: <Login />,
        name: "Login",
        nodeRef: createRef(),
    },
    {
        path: '/register',
        element: <Login />,
        name: 'Register',
        nodeRef: createRef()
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        name: "Dashboard",
        nodeRef: createRef(),
    },
];
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: routes.map((route) => ({
            index: route.path === '/',
            path: route.path === '/' ? undefined : route.path,
            element: route.element,
        })),
    },
]);
export default router;
