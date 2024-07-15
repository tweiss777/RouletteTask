import { createRef } from "react";
import { createBrowserRouter } from 'react-router-dom'
import App from "../App";
const routes = [
    {
        path: "/login",
        element: <h1>Login</h1>,
        name: "Login",
        nodeRef: createRef(),
    },
    {
        path: '/register',
        element: <h1>Register</h1>,
        name: 'Register',
        nodeRef: createRef()
    },
    {
        path: "/dashboard",
        element: <h1> dashboard</h1>,
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
