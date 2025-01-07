import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export const authRoutes = [
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/signup", element: <Signup /> }
]
export const routes = [
    { path: "/", element: <Home /> },
    { path: "/*", element: <div>Currently in development!</div> },
]