import { Route, Routes } from "react-router"
import { authRoutes, routes } from "./Routes"
import AuthLayout from "../layouts/AuthLayout"
import BaseLayout from "../layouts/BaseLayout"

const Router = () => {
    return (
        <Routes>
            {
                authRoutes.map(route => (
                    <Route key={route.path} element={<AuthLayout />}>
                        <Route path={route.path} element={route.element} />
                    </Route>
                ))
            }
            {
                routes.map(route => (
                    <Route key={route.path} element={<BaseLayout />}>
                        <Route path={route.path} element={route.element} />
                    </Route>
                ))
            }
        </Routes>
    )
}

export default Router;