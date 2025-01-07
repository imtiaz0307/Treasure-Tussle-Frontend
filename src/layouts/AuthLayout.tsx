import { Outlet } from "react-router"

const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center auth_layout">
            <Outlet />
        </div>
    )
}

export default AuthLayout