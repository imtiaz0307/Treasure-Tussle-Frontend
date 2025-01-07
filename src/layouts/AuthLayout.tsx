import { Outlet } from "react-router"

const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center auth_layout">
            <div
                className="absolute inset-0 bg-black opacity-60"
            />
            <div className="relative z-10">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout