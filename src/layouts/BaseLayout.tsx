import { useLayoutEffect } from "react"
import { Outlet, useNavigate } from "react-router"

const BaseLayout = () => {
    const navigate = useNavigate()
    useLayoutEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) navigate("/auth/login")
    }, [])
    return (
        <Outlet />
    )
}

export default BaseLayout