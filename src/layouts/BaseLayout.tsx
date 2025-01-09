import { useAtom } from "jotai"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { socketAtom, userAtom } from "../atoms"
import { io } from "socket.io-client"
import { getUser } from "../services/user.services"

const BaseLayout = () => {
    const [socket, setSocket] = useAtom(socketAtom)
    const [user, setUser] = useAtom(userAtom)

    const logoutHandler = () => {
        localStorage.removeItem("token")
        navigate("/auth/login")
    }

    const getAndSetUser = async (token: string) => {
        const _user = await getUser(token)
        setUser(_user)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            logoutHandler()
        } else {
            getAndSetUser(token)
        }
    }, [])

    useEffect(() => {
        if (user) {
            const socketIo = io(import.meta.env.VITE_API_BASE_URL, { query: { _id: user?._id } })
            socketIo.on("connect", () => {
                setSocket(socketIo)
            })

            return () => {
                socketIo.close()
            }
        }
        else {
            if (socket) {
                socket.close();
                setSocket(null)
            }
        }
    }, [user])

    const navigate = useNavigate()
    return (
        <>
            {user?.name}
            <Outlet />
        </>
    )
}

export default BaseLayout