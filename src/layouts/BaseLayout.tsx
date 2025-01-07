import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

const BaseLayout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) navigate("/auth/login")
    }, [])
    return (
        <Outlet />
    )
}

export default BaseLayout